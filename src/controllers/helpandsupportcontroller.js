import { helpsupportApi } from "../services/helpandsupportService.js"

const helpandsupportservice = async (req, res) => {
      try {
        await helpsupportApi(req, res) // ✅ pass req and res
      } catch (error) {
        res.status(500).json({ Error: error.message })
      }
    }
    

export {helpandsupportservice}