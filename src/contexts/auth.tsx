import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';
import {User} from '../interfaces/interfaces';

import { useTranslation } from 'react-i18next';


interface AuthContextData {
    signed: boolean;
    user: User | null;
    language: string;
    loading: boolean;
    fileServer: string | null ;
    titleHeader: string | null;
    errorMessage: string | null;
    hasError: boolean | null;
    setUserEdit: (user: User) => void;
    setTitleHeader(title: string): void;
    singIn(username: string, password: string): Promise<void>;
    singOut(): Promise<void>;
    setError(error: boolean, errorMessege: string | null): void;
    updateLanguage(language: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [fileServer, setFileServer] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [titleHeader, setTitle] = useState<string>('');
    const [hasError, setHasError] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
     const {t, i18n} = useTranslation();
  
    const [language, setLanguage] = useState<string>('pt');

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@ClubeScania:user');
            const storageToken = await AsyncStorage.getItem('@ClubeScania:token');
            const fileServer = await AsyncStorage.getItem('@ClubeScania:fileServer');
            const language = await AsyncStorage.getItem('@ClubeScania:language');

            if(storageUser && storageToken){     
                const strToken = 'Bearer ' + storageToken;      
                const strFileServer =   !!fileServer ? fileServer as string : '';
                api.defaults.headers.common['Authorization'] = strToken.replace('"','').replace('"',''); 
                setUser(JSON.parse(storageUser)); 
                setFileServer(strFileServer.replace('"','').replace('"',''));
                updateLanguage(JSON.parse(language ?? 'pt'));
            }
            setLoading(false);
        }

        loadStorage();
    }, [])

    async function setAuthorization(token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async function singIn(username: string, password: string) {
        const response = await auth.singInService(username, password);
        if (!response.error) {
            setAuthorization(response.token as string).then(() => {
                setUser(response.user);
                setFileServer(response.fileServer);
                AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(response.user));
                AsyncStorage.setItem('@ClubeScania:token', JSON.stringify(response.token));
                AsyncStorage.setItem('@ClubeScania:fileServer', JSON.stringify(response.fileServer));

                updateLanguage(response.user?.idioma ?? 'pt');
                
            })
            
        } else {
            setHasError(true);
            setErrorMessage(response.error);
        }
    }

    function setUserEdit(user: User) {
        try{
            setUser(user);
            AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(user));
        }
        catch(error){
            console.error(error);
        }
    }

    async function singOut() {
        await AsyncStorage.removeItem('@ClubeScania:token');
        await AsyncStorage.removeItem('@ClubeScania:user');
        await AsyncStorage.removeItem('@ClubeScania:fileServer');
        setUser(null)
    }
      
    function setTitleHeader(title: string){
        setTitle(title);
    }

    function setError(error: boolean | null, message: string | null){
        setHasError(error);
        setErrorMessage(message);
    }

    function goBack(title: string){
        setTitle(title);
    }

    async function updateLanguage(language: string) {
        console.log('setLanguage -> ', language);
        setLanguage(language);
        await AsyncStorage.setItem('@ClubeScania:language', JSON.stringify(language));
        i18n.changeLanguage(language);
    }

    return(
        <AuthContext.Provider value={{
            signed: 
                !!user, 
                user, 
                language,
                loading, 
                fileServer, 
                titleHeader, 
                singIn, 
                singOut,
                hasError, 
                errorMessage, 
                setTitleHeader, 
                setError, 
                setUserEdit,
                updateLanguage
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}