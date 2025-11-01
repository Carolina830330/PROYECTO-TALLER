import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/volcosdb?serverTimezone=UTC";
        String usuario = "root";
        String contraseña = "";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // <--- ESTA LÍNEA ES NECESARIA

            Connection conexion = DriverManager.getConnection(url, usuario, contraseña);
            System.out.println("Conexión exitosa a MySQL.");
            conexion.close();
        } catch (SQLException e) {
            System.out.println("Error en la conexión: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("No se encontró el driver: " + e.getMessage());
        }
    }
}
