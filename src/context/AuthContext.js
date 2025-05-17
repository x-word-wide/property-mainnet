import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign up with email and password
  async function signup(email, password, displayName) {
    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isVerified: false,
        accountType: 'individual', // individual, broker, developer
        walletAddress: '',
        profileImage: '',
        properties: [],
        watchlist: [],
        notifications: []
      });
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  
  // Sign in with email and password
  async function login(email, password) {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  
  // Sign in with Google
  async function loginWithGoogle() {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      // If not, create a new profile
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || 'User',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          isVerified: false,
          accountType: 'individual',
          walletAddress: '',
          profileImage: userCredential.user.photoURL || '',
          properties: [],
          watchlist: [],
          notifications: []
        });
      }
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  
  // Log out
  function logout() {
    setUserProfile(null);
    return signOut(auth);
  }
  
  // Reset password
  function resetPassword(email) {
    setError('');
    return sendPasswordResetEmail(auth, email);
  }
  
  // Update user profile
  async function updateUserProfile(data) {
    try {
      setError('');
      const userRef = doc(db, 'users', currentUser.uid);
      
      // Update Firestore profile
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      // If display name is being updated, also update in Auth
      if (data.displayName) {
        await updateProfile(currentUser, {
          displayName: data.displayName
        });
      }
      
      // Refresh user profile
      const updatedProfile = await getDoc(userRef);
      setUserProfile(updatedProfile.data());
      
      return updatedProfile.data();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  
  // Connect wallet address
  async function connectWallet(walletAddress) {
    try {
      setError('');
      if (!currentUser) throw new Error('User not authenticated');
      
      const userRef = doc(db, 'users', currentUser.uid);
      
      await updateDoc(userRef, {
        walletAddress: walletAddress,
        updatedAt: serverTimestamp()
      });
      
      // Refresh user profile
      const updatedProfile = await getDoc(userRef);
      setUserProfile(updatedProfile.data());
      
      return updatedProfile.data();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  
  // Fetch user profile from Firestore
  async function fetchUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return userDoc.data();
      } else {
        setUserProfile(null);
        return null;
      }
    } catch (err) {
      setError(err.message);
      setUserProfile(null);
      return null;
    }
  }
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    connectWallet,
    fetchUserProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}