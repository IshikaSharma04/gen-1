# Reflection

## What Worked Well
The most successful aspect of this assignment was the implementation of the Chain-of-Thought (CoT) reasoning instruction combined with negative constraints in the system prompts. By forcing the LLM to think inside `<thought>...</thought>` tags before generating the final output, the responses became significantly more pedagogical. Instead of the AI immediately blurting out a block of code, it paused to consider *why* the user was confused and *how* the specific persona would address that confusion. The frontend was then designed to strip out these thought blocks from the final UI, giving the illusion of a highly deliberate and carefully crafted response from the mentor.

Additionally, the UI design effectively grounds the experience. The use of suggestion chips specific to each persona's domain immediately guides the user on how to interact with them, and resetting the conversation state on persona switch prevents contextual hallucination.

## The GIGO Principle in Action
The "Garbage In, Garbage Out" (GIGO) principle was starkly apparent during the iterative prompt engineering phase. Initially, when I used a generic prompt like "Act as an experienced software engineering instructor," the AI produced boilerplate, robotic advice that sounded like Wikipedia. 

However, when I enriched the input with specific, well-researched attributes—such as Abhimanyu's "map and compass" analogy or Anshuman's focus on the "marathon, not a sprint" philosophy—the output drastically changed. The LLM adopted a distinct voice. Furthermore, injecting few-shot examples into the system prompt was the definitive cure for GIGO. By providing the model with exact examples of the input-output mapping (e.g., how to respond to a student failing an interview), the LLM learned the desired brevity and tone, completely eliminating overly verbose, generic outputs.

## Areas for Improvement
If I had more time, I would improve the architecture in two main ways:
1. **Streaming Responses:** Currently, the API waits for the entire generation to finish before sending it to the client. Implementing Server-Sent Events (SSE) or React Server Components to stream the response chunk-by-chunk would greatly enhance the user experience and reduce perceived latency.
2. **Context Management:** The current implementation sends the entire chat history back to the API on every request. While fine for short conversations, this approach does not scale. I would implement a token-aware sliding window or semantic summarization to manage the context window efficiently during longer mentorship sessions.
