import { Router } from 'express'
import { chatBot } from '../chatbot/chatbot.ts'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const prompt: string = req.body.prompt
    const result = await chatBot(prompt)

    res.status(201).json(result)
    console.log(result)
    return result
  } catch (err) {
    console.log(
      'error in the POST express route for posting the prompt to the langchain function ',
      err,
    )
  }
})

export default router
