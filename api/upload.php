<?php
/**
 * API para upload de imagens do Placid para o servidor SNDT
 * URL: https://files.sndt.com.br/placid/api/upload.php
 */

// Headers para CORS e JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

// Lidar com preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Apenas POST é permitido
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido. Use POST.']);
    exit;
}

// Verificar autenticação
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(['error' => 'Token de autorização não fornecido']);
    exit;
}

// Extrair token do header
$token = str_replace(['Bearer ', 'bearer '], '', $authHeader);

// Validar token
if (!validateToken($token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido']);
    exit;
}

// Verificar se arquivo foi enviado
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Nenhuma imagem foi enviada']);
    exit;
}

$uploadedFile = $_FILES['image'];
$fileName = $_POST['filename'] ?? generateFileName();

// Validações do arquivo
if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Erro no upload: ' . getUploadErrorMessage($uploadedFile['error'])]);
    exit;
}

// Validar tipo de arquivo
$allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
$fileType = mime_content_type($uploadedFile['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tipo de arquivo não permitido: ' . $fileType]);
    exit;
}

// Validar tamanho (máximo 10MB)
$maxSize = 10 * 1024 * 1024; // 10MB em bytes
if ($uploadedFile['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'Arquivo muito grande. Máximo: 10MB']);
    exit;
}

// Definir diretório de destino
$targetDir = __DIR__ . '/../images/';
$targetPath = $targetDir . $fileName;

// Criar diretório se não existir
if (!is_dir($targetDir)) {
    if (!mkdir($targetDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Falha ao criar diretório de upload']);
        exit;
    }
}

// Mover arquivo para destino final
if (!move_uploaded_file($uploadedFile['tmp_name'], $targetPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao salvar o arquivo']);
    exit;
}

// Configurar permissões do arquivo
chmod($targetPath, 0644);

// URL pública da imagem
$publicUrl = "https://files.sndt.com.br/placid/images/" . $fileName;

// Log do upload (opcional)
logUpload($fileName, $uploadedFile['size'], $_SERVER['REMOTE_ADDR']);

// Resposta de sucesso
echo json_encode([
    'success' => true,
    'url' => $publicUrl,
    'filename' => $fileName,
    'size' => $uploadedFile['size'],
    'type' => $fileType,
    'timestamp' => date('c'),
    'uploaded_by' => getTokenInfo($token)['name'] ?? 'unknown'
]);

/**
 * Validar token de acesso
 */
function validateToken($token) {
    // Tokens válidos - Em produção, use banco de dados ou arquivo de configuração
    $validTokens = [
        'sndt_live_abc123def456' => ['name' => 'placid-api', 'permissions' => ['upload']],
        'sndt_test_xyz789ghi012' => ['name' => 'placid-test', 'permissions' => ['upload']],
    ];
    
    return isset($validTokens[$token]);
}

/**
 * Obter informações do token
 */
function getTokenInfo($token) {
    $validTokens = [
        'sndt_live_abc123def456' => ['name' => 'placid-api', 'permissions' => ['upload']],
        'sndt_test_xyz789ghi012' => ['name' => 'placid-test', 'permissions' => ['upload']],
    ];
    
    return $validTokens[$token] ?? null;
}

/**
 * Gerar nome de arquivo único
 */
function generateFileName() {
    return uniqid('placid_', true) . '.png';
}

/**
 * Obter mensagem de erro de upload
 */
function getUploadErrorMessage($errorCode) {
    switch ($errorCode) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return 'Arquivo muito grande';
        case UPLOAD_ERR_PARTIAL:
            return 'Upload incompleto';
        case UPLOAD_ERR_NO_FILE:
            return 'Nenhum arquivo enviado';
        case UPLOAD_ERR_NO_TMP_DIR:
            return 'Diretório temporário não encontrado';
        case UPLOAD_ERR_CANT_WRITE:
            return 'Falha ao escrever no disco';
        case UPLOAD_ERR_EXTENSION:
            return 'Upload bloqueado por extensão';
        default:
            return 'Erro desconhecido';
    }
}

/**
 * Registrar log do upload
 */
function logUpload($fileName, $size, $ip) {
    $logFile = __DIR__ . '/upload.log';
    $logEntry = sprintf(
        "[%s] Upload: %s | Size: %s bytes | IP: %s\n",
        date('Y-m-d H:i:s'),
        $fileName,
        number_format($size),
        $ip
    );
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}
?>