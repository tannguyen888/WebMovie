
import java.com.movieapp.model.User;
import java.security.MessageDigest;

public class hashTable {
    private String[] table;
    private int size;
    private final User user;

    public hashTable(int size) {
        this.size = size;
        this.table = new String[size];
        this.user = new User();
    }

    public static String hashItem(Srting key) {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(key.getBytes());

        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02x", b));
        }

        return hexString.toString();
    }

    public void add(String key) {
        int hashLoc = hashfunction(key);
        while (table[hashLoc] != null && !table[hashLoc].equals("**DEL**")) {
            hashLoc = (hashLoc + 1) % size;
        }
        table[hashLoc] = key;
    }

    public void search(String key) {
        int hashLoc = hashfunction(key);
        while (table[hashLoc] != null && !table[hashLoc].equals("**DEL**")) {
            if (table[hashLoc].equals(key)) {
                System.out.println("Found " + key);
                return;
            }
            hashLoc = (hashLoc + 1) % size;
        }
    }

    public int hashfunction(String key) {
        int sum = 0, weight = 1;
        for (int i = 0; i < key.length(); i++) {
            sum += key.charAt(i) * weight;
            weight++;
        }
        return sum % maxItem;

    }

}
