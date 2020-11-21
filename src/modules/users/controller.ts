import { RequestHandler } from "../../utils/requestHandler";
import * as service from './service'
import { ValidationError } from 'sequelize'

export const createUser = async (handler: RequestHandler) => {
  const body = handler.getBody()
  try {
    const user = await service.createUser(body || {})
    handler.sendCreatedResponse(user)
  } catch (error) {
    if (error instanceof ValidationError) {
      handler.sendValidationError(error.errors[0])
    } else {
      handler.sendServerError(error)
    }
  }
};