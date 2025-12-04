import { TypingAnimation } from "@/components/ui/typing-animation"

export function Type_writer_hero() {
  return (
    <div>
        <TypingAnimation
          words={["License Plate Recognizer"]}
          cursorStyle="block"
          loop
          className="text-4xl font-bold color-foreground"
        />
      </div>
  )
}
