// import { Router } from 'express'
// import { chatBot } from '../chatbot/chatbot.ts'

// const router = Router()

// router.post('/', async (req, res) => {
//   try {
//     const prompt: string = req.body.prompt
//     // headers for SSE (Server Sent Events) | server sent evvents allow a server to push real time updates to a web page over a single persistent HTTP connection creating a one way data stream to a client
//     res.setHeader('Content-Type', 'text/event-stream')
//     res.setHeader('Cache-Control', 'no-cache')
//     res.setHeader('Connection', 'keep-alive')

//     await chatBot(prompt, (chunk: string) => {
//       res.write(`data: ${chunk}\n\n`)
//     })

//     res.write('data: [DONE]\n\n')
//     res.end()

//     // res.status(201).json(result)
//     // console.log(result)
//     //return result
//   } catch (err) {
//     console.log(
//       'error in the POST express route for posting the prompt to the langchain function ',
//       err,
//     )
//   }
// })

// export default router

import { Router } from 'express'
import { chatBot } from '../chatbot/chatbot.ts'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages
    // headers for SSE (Server Sent Events) | server sent evvents allow a server to push real time updates to a web page over a single persistent HTTP connection creating a one way data stream to a client
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    await chatBot(messages, (chunk: string) => {
      res.write(`data: ${chunk}\n\n`)
    })

    res.write('data: [DONE]\n\n')
    res.end()

    // res.status(201).json(result)
    // console.log(result)
    //return result
  } catch (err) {
    console.log(
      'error in the POST express route for posting the prompt to the langchain function ',
      err,
    )
  }
})

export default router
