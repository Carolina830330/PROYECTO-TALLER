import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/volcosdb";
        String usuario = "root";
        String contraseña = "";

        try {
            Connection conexion = DriverManager.getConnection(url, usuario, contraseña);
            System.out.println("Conexión exitosa a MySQL.");
            conexion.close();
        } catch (SQLException e) {
            System.out.println("Error en la conexión: " + e.getMessage());
        }
    }
}