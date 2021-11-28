declare namespace Express {
  export interface Request {
    user?: { id: string; email: string; first_name: string; last_name: string };
  }
}
