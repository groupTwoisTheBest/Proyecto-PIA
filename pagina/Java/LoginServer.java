package Java;

import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.util.*;

public class LoginServer {

    static List<Person> users = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        loadUsers();

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null);
        System.out.println("Servidor iniciado en http://localhost:8080/login");
        server.start();
    }

    static void loadUsers() throws IOException {
        // Se ajusta la ruta para que funcione con la estructura mostrada
        File file = new File("Java/USERDATA.txt");
        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String[] parts = scanner.nextLine().split(",");
                if (parts.length >= 2) {
                    users.add(new Person(parts[0], parts[1]));
                }
            }
        }
    }

    static class LoginHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {
            if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                exchange.sendResponseHeaders(405, -1); // Método no permitido
                return;
            }

            // Leer cuerpo de la solicitud
            InputStreamReader isr = new InputStreamReader(exchange.getRequestBody());
            BufferedReader reader = new BufferedReader(isr);
            StringBuilder body = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                body.append(line);
            }

            // Extraer parámetros del formulario
            String tempUsername = "", tempPassword = "";
            String[] params = body.toString().split("&");
            for (String param : params) {
                String[] keyVal = param.split("=");
                if (keyVal.length == 2) {
                    String key = keyVal[0];
                    String value = URLDecoder.decode(keyVal[1], "UTF-8");
                    if (key.equals("username")) tempUsername = value;
                    if (key.equals("password")) tempPassword = value;
                }
            }

            // Convertir a final para usarlos en lambda
            final String usernameFinal = tempUsername;
            final String passwordFinal = tempPassword;

            // Verificar credenciales
            boolean valid = users.stream().anyMatch(u ->
                u.getUsername().equals(usernameFinal) && u.getPassword().equals(passwordFinal)
            );

            // Agregar cabeceras CORS para permitir acceso desde Live Server
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

            // Enviar respuesta
            String response = valid ? "SUCCESS" : "FAIL";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
