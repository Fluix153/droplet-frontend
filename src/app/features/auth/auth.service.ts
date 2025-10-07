import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }) {
        return this.http.post(`${this.apiUrl}/auth/login`, credentials);
    }
}