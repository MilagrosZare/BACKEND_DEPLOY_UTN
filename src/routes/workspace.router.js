import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createWorkspaceController, invteUserToWorkspaceController, getUserWorkspacesController } from "../controllers/workspace.controller.js"

const workspace_router = Router()

workspace_router.post('/', authMiddleware, createWorkspaceController)

workspace_router.post('/:workspace_id/invite/:invited_id', authMiddleware, invteUserToWorkspaceController)

workspace_router.get('/:user_id', authMiddleware, getUserWorkspacesController)

export default workspace_router