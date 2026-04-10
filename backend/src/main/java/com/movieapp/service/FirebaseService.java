package com.movieapp.service;

// TODO: Re-enable when Firebase is configured with serviceAccountKey.json
// Temporarily disabled - Firebase Admin SDK dependency removed

/*
 * import com.google.firebase.auth.FirebaseAuth;
 * import com.google.firebase.auth.FirebaseToken;
 * import com.google.auth.oauth2.GoogleCredentials;
 * import com.google.firebase.FirebaseApp;
 * import com.google.firebase.FirebaseOptions;
 * import com.google.firebase.auth.FirebaseAuthException;
 * import org.springframework.stereotype.Service;
 * import java.io.FileInputStream;
 * import java.io.IOException;
 * 
 * @Service
 * public class FirebaseService {
 * 
 * public FirebaseService() throws IOException {
 * FileInputStream serviceAccount = new
 * FileInputStream("src/main/resources/serviceAccountKey.json");
 * FirebaseApp.initializeApp(FirebaseOptions.builder()
 * .setCredentials(GoogleCredentials.fromStream(serviceAccount))
 * .build());
 * }
 * 
 * public FirebaseToken verifyIdToken(String idToken) throws
 * FirebaseAuthException {
 * return FirebaseAuth.getInstance().verifyIdToken(idToken);
 * }
 * }
 */