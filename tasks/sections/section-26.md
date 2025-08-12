## Section 26 — P0 Group: ChatAPI (Part 1 of 1)

Scope: Implement chat messaging endpoints from `methods/15-chatapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ChatAPI)
- File: `api-doc/ozon-api-documentation/methods/15-chatapi.json`

Endpoints covered:
1) POST `/v1/chat/send/message` (operationId: `ChatAPI_ChatSendMessage`)
2) POST `/v1/chat/send/file` (operationId: `ChatAPI_ChatSendFile`)
3) POST `/v1/chat/start` (operationId: `ChatAPI_ChatStart`)
4) POST `/v2/chat/list` (operationId: `ChatAPI_ChatListV2`)
5) POST `/v3/chat/list` (operationId: `ChatAPI_ChatListV3`)
6) POST `/v2/chat/history` (operationId: `ChatAPI_ChatHistoryV2`)
7) POST `/v3/chat/history` (operationId: `ChatAPI_ChatHistoryV3`)
8) POST `/v2/chat/read` (operationId: `ChatAPI_ChatReadV2`)

Naming guideline (SDK):
- Namespace: `client.chat`
- Methods: `sendMessageV1`, `sendFileV1`, `startChatV1`, `listChatsV2`, `listChatsV3`, `getChatHistoryV2`, `getChatHistoryV3`, `markChatReadV2`

### T-700: Types for ChatAPI models
- Description: Define/generate types for messaging/list/history/read operations.
- Models (at minimum): `chatChatSendMessageRequest/Response`, `chatChatSendFileRequest/Response`, `chatChatStartRequest/Response`, `chatChatListV2Request/Response`, `chatChatListV3Request/Response`, `chatChatHistoryV2Request/Response`, `chatChatHistoryV3Request/Response`, `chatChatReadV2Request/Response`.
- Deliverables: `src/types/chat.part1.ts` (≤ 200 LOC; split if needed).

### T-701: Implement client.chat.sendMessageV1
- Description: Call POST `/v1/chat/send/message`; enforce Premium Plus constraints in docs.
- Validation: require `chat_id`, `text`.
- File: `src/apis/chat.ts`.

### T-702: Implement client.chat.sendFileV1
- Description: Call POST `/v1/chat/send/file` with `base64_content`, `name`, `chat_id`.
- Validation: size/type constraints as per docs; consider streaming helper.
- File: `src/apis/chat.ts`.

### T-703: Implement client.chat.startChatV1
- Description: Call POST `/v1/chat/start` to start a new chat where applicable.
- File: `src/apis/chat.ts`.

### T-704: Implement client.chat.listChatsV2 and listChatsV3
- Description: Call POST `/v2/chat/list` and `/v3/chat/list`; prefer V3 in examples, keep V2 for backward compat.
- File: `src/apis/chat.ts`.

### T-705: Implement client.chat.getChatHistoryV2 and getChatHistoryV3
- Description: Call POST `/v2/chat/history` and `/v3/chat/history`; prefer V3 in examples.
- File: `src/apis/chat.ts`.

### T-706: Implement client.chat.markChatReadV2
- Description: Call POST `/v2/chat/read` to mark messages read.
- File: `src/apis/chat.ts`.

### T-707: Unit tests — ChatAPI happy-path
- Add MSW/nock mocks for 8 endpoints; verify headers and payloads; decode responses.
- File: `tests/chat.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-708: Unit tests — validations and edge cases
- Send message/file: invalid privileges (Premium Plus), empty `chat_id`, oversize file.
- List/history: paging and version differences (V2 vs V3) covered.
- Map 4xx/5xx to `OzonApiError`.

### T-709: Documentation
- Add `docs/groups/chat.md` with examples for send, file upload, start, list (V3), history (V3), and read; note Premium Plus/temporal limits.

### T-710: Usage examples (repo)
- `examples/chat/send-message-v1.ts`
- `examples/chat/send-file-v1.ts`
- `examples/chat/start-chat-v1.ts`
- `examples/chat/list-chats-v3.ts`
- `examples/chat/get-chat-history-v3.ts`
- `examples/chat/mark-chat-read-v2.ts`

### T-711: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
