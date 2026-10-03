# 🤖 AI Engineering & Prompt Engineering Masterclass — Real-World Interview Questions
### Ikki tilli AI va Sun'iy Intelekt Qo'llanmasi / Comprehensive Bilingual Guide (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Prompt Engineering (Zero-Shot, Few-Shot, Chain-of-Thought, ReAct), LLM Architecture (Transformers, Tokens, Temperature, Context Windows), RAG (Embeddings, Vector Databases, Chunking, Re-ranking), AI Agents (Tool Calling, Subagents, Multi-Agent Workflows), Fine-Tuning (LoRA, QLoRA, RLHF, DPO), Model Quantization (GGUF, AWQ).  

---

# 📚 CHUQUR NAZARIYA: AI & PROMPT ENGINEERING ARCHITECTURE

---

## 1. 🤖 LLM Arxitekturasi va Transformer Modeli
Zamonaviy Katta Til Modellari (LLM — Large Language Models) **Transformer** arxitekturasi va **Self-Attention** mexanizmi negizida ishlaydi:
- **Tokens (Tokenlar):** Matn kichik so'z bo'laklariga (sub-words) bo'linadi (masalan, 1000 so'z ≈ 1300 token).
- **Context Window (Kontekst Derazasi):** Model bir vaqtda eslab qolishi mumkin bo'lgan maksimal tokenlar soni (masalan 128k - 1M token).
- **Hyperparameters:**
  - `Temperature (0.0 - 1.0)`: 0.0 — deterministic/aniq va bir xil javob; 1.0 — ijodkor/kreativ javob.
  - `Top-P (Nucleus Sampling)`: Ehtimollik bo'yicha eng yuqori tokenlar to'plamini tanlash.
  - `Frequency / Presence Penalty`: So'zlar takrorlanishini cheklash.

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q10)

---


## Q1. System Prompt vs User Prompt vs Assistant Role | System, User va Assistant Prompt rollari farqi

**EN:** System prompt defines identity; User prompt carries task input.

**UZB:** System prompt xarakterni, User prompt topshiriqni saqlaydi.

```python
[
  { 'role': 'system', 'content': 'You are a Senior Python Developer.' },
  { 'role': 'user', 'content': 'Write binary search.' }
]
```

---

## Q2. Chain-of-Thought (CoT) Prompting | Chain-of-Thought (CoT) zanjirli fikrlash texnikasi

**EN:** Asking the model to think step-by-step before answering.

**UZB:** Modelga 'Let\'s think step by step' deyish orqali aniqlikni oshirish.

```python
Prompt: 'Solve this math problem. Let\'s think step by step...'
```

---

## Q3. Few-Shot Prompting Technique | Few-Shot Prompting texnikasi va namunalar berish

**EN:** Providing 2-3 input-output examples inside prompt.

**UZB:** Modelga 2-3 ta namuna misol ko'rsatib javob olish.

```python
Input: Great battery! -> Positive
Input: Broke in 2 days -> Negative
```

---

## Q4. ReAct (Reason + Act) Agent Framework | ReAct (Reason + Act) AI Agent karkasi

**EN:** Combining reasoning traces and task-specific actions.

**UZB:** Thought -> Action -> Observation siklida ishlash.

```python
Thought: Check Tashkent weather.
Action: search_weather({'city': 'Tashkent'})
```

---

## Q5. RAG Architecture & Semantic Search | RAG (Retrieval-Augmented Generation) arxitekturasi

**EN:** Retrieving document chunks using vector embeddings.

**UZB:** Kompaniya ma'lumotlarini vektorli bazadan qidirib LLM ga uzatish.

```python
// RAG Pipeline: Doc -> Chunking -> Embedding -> VectorDB Search -> LLM Context
```

---

## Q6. LLM Temperature and Top-P Parameters | Temperature va Top-P giperparametrlari

**EN:** Temperature controls randomness; Top-P limits token pool.

**UZB:** Temperature javob tasodifiyligini va ijodkorligini belgilaydi.

```python
{ 'temperature': 0.2, 'top_p': 0.95 }
```

---

## Q7. Function Calling / Tool Calling JSON Schema | Function Calling va Tool Calling JSON Sxemasi

**EN:** LLMs return structured JSON function call arguments.

**UZB:** LLM bajarilishi kerak bo'lgan funksiya argumentlarini JSON da qaytaradi.

```python
tools = [{'type': 'function', 'function': {'name': 'get_stock', 'parameters': {'type': 'object'}}}]
```

---

## Q8. Vector Embeddings & Cosine Similarity | Vektorli Embedding va Cosine Similarity masofasi

**EN:** Embeddings convert text to high-dimensional vectors.

**UZB:** Embedding matnni vektorga o'tkazadi, Cosine o'xshashlikni o'lchaydi.

```python
cosine_similarity = dot(A, B) / (norm(A) * norm(B))
```

---

## Q9. LoRA and QLoRA Fine-Tuning | LoRA va QLoRA yengil Fine-Tuning texnologiyasi

**EN:** Freezing base weights and training small adapters.

**UZB:** LoRA asosiy modelni muzlatib kichik adapterlarni o me rgatadi.

```python
config = LoraConfig(r=8, lora_alpha=16, target_modules=['q_proj', 'v_proj'])
```

---

## Q10. RLHF vs DPO Alignment | RLHF va DPO (Direct Preference Optimization)

**EN:** RLHF uses reward model; DPO optimizes preference loss directly.

**UZB:** DPO afzal ko me rilgan juftliklar bo'yicha to me g me ri modellaydi.

```python
DPO Loss = -log(sigmoid(beta * log(P_win / P_lose)))
```
