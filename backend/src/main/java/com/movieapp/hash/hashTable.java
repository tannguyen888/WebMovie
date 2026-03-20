package com.movieapp.hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class hashTable {
    private String[] table;
    private int size;

    public hashTable(int size) {
        this.size = size;
        this.table = new String[size];
    }

    public static String hashItem(String key) throws NoSuchAlgorithmException {
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
        return sum % size;

    }

    public void collision(String key) {
        int hashLoc = hashfunction(key);
        while (table[hashLoc] != null && !table[hashLoc].equals("**DEL**")) {
            System.out.println("Collision at " + hashLoc + " for key: " + key);
            hashLoc = (hashLoc + 1) % size;
        }
    }

    public void delete(String key) {
        int hashLoc = hashfunction(key);
        while (table[hashLoc] != null && !table[hashLoc].equals("**DEL**")) {
            if (table[hashLoc].equals(key)) {
                table[hashLoc] = "**DEL**";
                return;
            }
            hashLoc = (hashLoc + 1) % size;
        }
    }

    public String getItem(String key) {
        int hasloc = hashfunction(key);
        while (table[hasloc] != null && !table[hasloc].equals("**DEL**")) {
            if (table[hasloc].equals(key)) {
                return table[hasloc];
            }
            hasloc = (hasloc + 1) % size;
        }
        return null;
    }

}
