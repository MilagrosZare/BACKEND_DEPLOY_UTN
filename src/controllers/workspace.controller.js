import Workspace from "../models/Workspace.model.js";
import workspaceRepository from "../repositories/workspace.repository.js";


export const createWorkspaceController = async (req, res) => {
    try {
        const { name } = req.body
        const owner_id = req.user._id
        const new_workspace = await workspaceRepository.createWorkspace({ name, owner_id })
        res.json({
            ok: true,
            status: 201,
            message: 'Workspace created!',
            data: {
                new_workspace
            }
        })
    } catch (error) {
        console.log("error al registrar", error);

        if (error.status) {
            return res.status(400).send({
                ok: false,
                status: error.status,
                message: error.message
            });
        }

        res.status(500).send({
            status: 500,
            ok: false,
            message: "internal server error"
        });
    }
}


export const invteUserToWorkspaceController = async (req, res) => {
    try {
        const user_id = req.user._id
        const {invited_id, workspace_id} = req.params

        const workspace_found = await workspaceRepository.addNewMember({owner_id: user_id, invited_id, workspace_id})
        res.json(
            {
                ok: true,
                status: 201,
                message: 'New member',
                data: {
                    workspace: workspace_found
                }
            }
        )
    } catch (error) {
        console.log("error al registrar", error);

        if (error.status) {
            return res.status(400).send({
                ok: false,
                status: error.status,
                message: error.message
            });
        }

        res.status(500).send({
            status: 500,
            ok: false,
            message: "internal server error"
        });
    }
}

export const getUserWorkspacesController = async (req, res) => {
    try {
        console.log("Usuario autenticado:", req.user); // Verifica que el usuario esté en el request

        if (!req.user || !req.user.user_id) {
            return res.status(400).json({ error: "Usuario no autenticado" });
        }

        const user_id = req.user.user_id;
        console.log("Buscando workspaces para el usuario ID:", user_id);

        // Buscar workspaces donde el usuario es miembro o dueño
        const workspaces = await Workspace.find({
            $or: [{ owner: user_id }, { members: user_id }]
        });

        console.log("Workspaces encontrados:", workspaces);

        return res.status(200).json({
            workspaces,
            user_id
        });
    } catch (error) {
        console.error("Error al obtener los workspaces:", error);
        return res.status(500).json({ error: "Error al obtener los workspaces" });
    }
};