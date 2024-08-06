import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface Incidence {
  date: string;
  title: string;
  description: string;
  photo: string;
  educationalCenter: string;
  regional: string;
  district: string;
}
export interface SignIn {
  cedula: string;
  clave: string;
}

export default interface User {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fecha_nacimiento: string;
  token: string;
}

interface RespuestaAPI<T> {
  exito: boolean;
  datos: T;
  mensaje: string;
}

export interface College {
  idx: string;
  codigo: string;
  nombre: string;
  coordenadas: string;
  distrito: string;
  regional: string;
  d_dmunicipal: string;
}

export interface SchoolVisit {
  id: string;
  cedula_director: string;
  codigo_centro: string;
  motivo: string;
  latitud: string;
  longitud: string;
  fecha: string;
  hora: string;
}
export interface News {
  title: string;
  image:  string;
  description: string;
  content:  string;
  link:  string;
}

//sebastian santos 2021-1096
export class Endpoints {
  public async login(credentials: FormData): Promise<RespuestaAPI<User>> {
    const { data } = await axios.post("https://adamix.net/minerd/def/iniciar_sesion.php", credentials);
    return data;
  }
  
  public async registerEvent(event: Incidence): Promise<void> {
    const { data } = await axios.post("http://10.0.0.6:3000/api/info", event);
    return data;
  }

  public async getEvents(): Promise<any> {
    const { data } = await axios.get("http://10.0.0.6:3000/api/info");

    return data;
  }

  public async deleteIncidences(): Promise<void> {
    const { data } = await axios.delete("http://10.0.0.6:3000/api/info");

    return data;
  }

  public async getCollegeById(): Promise<RespuestaAPI<College[]>> {
    const { data } = await axios.get("https://adamix.net/minerd/minerd/centros.php?regional=*");

    return data;
  }

  public async getMyVisits(token: string): Promise<RespuestaAPI<SchoolVisit[]>> {
    const { data } = await axios.get(`https://adamix.net/minerd/def/situaciones.php?token=${token}`);

    return data;
  }

  public async LogVisit(newVisit: FormData): Promise<void> {
    const { data } = await axios.post("https://adamix.net/minerd/minerd/registrar_visita.php", newVisit);

    return data;
  }

  public async getNews(): Promise<News[]> {
    const { data } = await axios.get("https://adamix.net/minerd/def/noticias.php");

    return data;
  }
}
