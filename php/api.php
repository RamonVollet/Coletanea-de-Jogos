<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$console = $_GET["console"] ?? "xbox";
if ($console !== "xbox" && $console !== "playstation" && $console !== "nintendo") {
    $console = "xbox";
}

$jsonDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . "json";
if (!is_dir($jsonDir)) {
    mkdir($jsonDir, 0777, true);
}

$arquivo = $jsonDir . DIRECTORY_SEPARATOR . $console . ".json";

$arquivoLegado = dirname(__DIR__) . DIRECTORY_SEPARATOR . "jogos.json";
if (!file_exists($arquivo) && $console === "xbox" && file_exists($arquivoLegado)) {
    copy($arquivoLegado, $arquivo);
}

if (!file_exists($arquivo)) {
    file_put_contents($arquivo, "[]");
}

$metodo = $_SERVER["REQUEST_METHOD"];
$dados = json_decode(file_get_contents("php://input"), true);
$jogos = json_decode(file_get_contents($arquivo), true);

switch ($metodo) {
    case "GET":
        echo json_encode($jogos, JSON_PRETTY_PRINT);
        break;

    case "POST":
        // Adiciona novo jogo
        $jogos[] = $dados;
        file_put_contents($arquivo, json_encode($jogos, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "Jogo adicionado com sucesso!"]);
        break;

    case "PUT":
        // Editar jogo existente
        $index = $dados["index"];
        unset($dados["index"]);
        $jogos[$index] = $dados;
        file_put_contents($arquivo, json_encode($jogos, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "Jogo atualizado!"]);
        break;

    case "DELETE":
        // Excluir jogo
        $index = $dados["index"];
        array_splice($jogos, $index, 1);
        file_put_contents($arquivo, json_encode($jogos, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "Jogo removido!"]);
        break;
}
