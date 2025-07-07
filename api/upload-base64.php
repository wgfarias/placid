<?php
/**
 * API de upload via Base64 - Contorna Mod_Security
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Verificar token
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

if (!$authHeader || !str_contains($authHeader, 'sndt_live_abc123def456')) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido']);
    exit;
}

// Ler dados JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['image']) || !isset($data['filename'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados obrigatórios: image (base64) e filename']);
    exit;
}

try {
    // Decodificar Base64
    $imageData = base64_decode($data['image']);
    if ($imageData === false) {
        throw new Exception('Base64 inválido');
    }

    // Validar tamanho (max 10MB)
    if (strlen($imageData) > 10 * 1024 * 1024) {
        throw new Exception('Arquivo muito grande (max 10MB)');
    }

    // Criar diretório se necessário
    $targetDir = __DIR__ . '/../images/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Salvar arquivo
    $fileName = $data['filename'];
    $targetPath = $targetDir . $fileName;
    
    if (!file_put_contents($targetPath, $imageData)) {
        throw new Exception('Falha ao salvar arquivo');
    }

    // Configurar permissões
    chmod($targetPath, 0644);

    // URL pública
    $publicUrl = "https://files.sndt.com.br/placid/images/" . $fileName;

    // Log
    error_log(sprintf(
        "[%s] Upload Base64: %s | Size: %d bytes\n",
        date('Y-m-d H:i:s'),
        $fileName,
        strlen($imageData)
    ));

    // Resposta de sucesso
    echo json_encode([
        'success' => true,
        'url' => $publicUrl,
        'filename' => $fileName,
        'size' => strlen($imageData),
        'type' => 'image/' . pathinfo($fileName, PATHINFO_EXTENSION),
        'timestamp' => date('c'),
        'method' => 'base64'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 