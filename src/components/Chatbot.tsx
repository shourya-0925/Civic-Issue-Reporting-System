import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm CivicBot, your civic assistant. I can help you with reporting issues, understanding the process, or navigating our platform. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const predefinedResponses: { [key: string]: string } = {
    "how to report": "To report an issue: 1) Click 'Report an Issue' button, 2) Take a photo of the issue, 3) Add description and location, 4) Submit. Your report will be tracked automatically!",
    "track issue": "You can track your reported issues by: 1) Going to the Map page to see all issues, 2) Using the Dashboard to see your personal reports, 3) Each report has a status indicator showing progress.",
    "what issues": "You can report: Potholes, Broken streetlights, Garbage collection problems, Water supply issues, Road damage, Traffic signal problems, and other civic infrastructure issues.",
    "response time": "Average response time is 24 hours. You'll get notifications when your report is reviewed, assigned to authorities, and resolved.",
    "free service": "Yes! CivicPulse is completely free for all citizens. Our goal is to improve community infrastructure through citizen participation.",
    "pune areas": "We cover all areas of Pune including PCMC. You can report issues from any location within the greater Pune metropolitan area.",
    "contact": "For urgent issues, contact local authorities directly. For platform support, you can reach us through the contact form in the dashboard.",
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("report") || message.includes("submit")) {
      return predefinedResponses["how to report"];
    }
    if (message.includes("track") || message.includes("status")) {
      return predefinedResponses["track issue"];
    }
    if (message.includes("what") && message.includes("issue")) {
      return predefinedResponses["what issues"];
    }
    if (message.includes("time") || message.includes("response")) {
      return predefinedResponses["response time"];
    }
    if (message.includes("free") || message.includes("cost") || message.includes("price")) {
      return predefinedResponses["free service"];
    }
    if (message.includes("pune") || message.includes("area") || message.includes("location")) {
      return predefinedResponses["pune areas"];
    }
    if (message.includes("contact") || message.includes("support") || message.includes("help")) {
      return predefinedResponses["contact"];
    }
    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! I'm here to help you with CivicPulse. You can ask me about reporting issues, tracking progress, or how our platform works.";
    }

    return "I understand you're asking about civic reporting. Here are some things I can help with: How to report issues, track your reports, what types of issues you can report, response times, and general platform guidance. What specific information do you need?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 bg-primary hover:bg-primary/90",
          isOpen && "hidden"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 bg-background border">
          <CardHeader className="pb-3 bg-primary text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="h-4 w-4" />
                CivicBot Assistant
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 mb-3",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[220px] rounded-lg px-3 py-2 text-sm",
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-white"
                    )}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;