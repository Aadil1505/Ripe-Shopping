import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Have a question? Fill out the form  or contact us directly.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-500 dark:text-gray-400">Science & Innovation Center, Hofstra University</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-500 dark:text-gray-400">(516) 615-5165</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-500 dark:text-gray-400">ripe@ripe.com</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter the subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={5} />
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
