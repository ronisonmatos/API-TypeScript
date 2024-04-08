import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (typeof err === "string") {
    // erro de aplicação personalizado
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // erro de validação do postgres
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // erro de autenticação jwt
    return res.status(401).json({ message: "Token inválido" });
  }
  
  // erro do servidor 500 por padrão
  return res.status(500).json({ message: err.message });
}

export default errorHandler;
