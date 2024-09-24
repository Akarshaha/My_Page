import conf from '../conf/conf.js';
// import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    

    async  createAccount({email,password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password,name)
            if (userAccount) {
                return this.login({email, password});

            } else {
                return userAccount;
                
            }
        } catch {
            throw new Error("not found");
            
            
        }
        
    }


    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch  {
            throw new Error("not found");
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

