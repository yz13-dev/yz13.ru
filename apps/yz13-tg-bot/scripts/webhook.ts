import { webhookCallback } from 'grammy'
import { bot } from '../src/bot'

export default {
    fetch: (request: Request) => {
        request.json = async function() {
            return JSON.parse(atob(await this.text()))
        }
        // webhookCallback will make sure that the correct middleware(listener) function is called
        return webhookCallback(bot, 'std/http')(request)
    },
}
