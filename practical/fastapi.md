# FastAPI amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [fastapi hujjatlari](https://fastapi.tiangolo.com/).

## Q1. Loyihada auth tekshiruvi har endpointda nusxalanib ayrim route himoyasiz qolmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin security dependency yarating va router yoki endpointga Depends bilan ulang. Masalan, `user: Annotated[User, Depends(get_current_user)]` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/security/).

## Q2. Loyihada request bodydagi noto'g'ri type service ichida kech xato bermoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Pydantic model va field constraintlar bilan boundaryda validatsiya qiling. Masalan, `class Item(BaseModel): price: Annotated[Decimal, Field(gt=0)]` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/body/).

## Q3. Loyihada database session exception paytida yopilmay connection pool to'lmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin yield dependencyda finally orqali sessionni yoping. Masalan, `def get_db():
  with Session(engine) as db: yield db` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/).

## Q4. Loyihada unit test production database dependencyga ulanmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin app.dependency_overrides orqali fake dependency bering va testdan keyin clear qiling. Masalan, `app.dependency_overrides[get_db] = override_get_db` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/testing-dependencies/).

## Q5. Loyihada async endpoint ichida blocking SDK event loopni band qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin sync SDKni oddiy def dependency/handlerga yoki threadpoolga ajrating. Masalan, `result = await run_in_threadpool(client.call)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/async/).

## Q6. Loyihada topilmagan resource 200 va null qaytarib clientni chalkashtirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin HTTPExceptionni aniq status va xavfsiz detail bilan raise qiling. Masalan, `raise HTTPException(status_code=404, detail='Item not found')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/handling-errors/).

## Q7. Loyihada response ORMdagi maxfiy maydonlarni ham serialize qilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin response_model bilan outbound sxemani allowlist qiling. Masalan, `@app.get('/users/{id}', response_model=PublicUser)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/response-model/).

## Q8. Loyihada katta email yuborish request latencyni oshirmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin kichik process-local ish uchun BackgroundTasks, og'ir durable ish uchun queue tanlang. Masalan, `background_tasks.add_task(send_email, address)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/background-tasks/).

## Q9. Loyihada SPA boshqa origindan APIga chiqib browser CORS bilan bloklamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin aniq origin, method va header allowlist bilan CORSMiddleware sozlang. Masalan, `allow_origins=['https://app.example.com']` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/cors/).

## Q10. Loyihada startupda model yuklanib shutdown paytida resource yopilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin lifespan async context managerda setup va cleanupni juftlang. Masalan, `@asynccontextmanager
async def lifespan(app): yield` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/events/).

## Q11. Loyihada upload endpoint katta faylni bytes sifatida RAMga to'liq olmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin UploadFile orqali spooled file va streaming read ishlating. Masalan, `async def upload(file: UploadFile): chunk = await file.read(65536)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/request-files/).

## Q12. Loyihada websocket uzilganda infinite loop exception bilan shovqinli tugamoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin WebSocketDisconnectni tutib connection registryni tozalang. Masalan, `except WebSocketDisconnect: manager.disconnect(ws)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/websockets/).

## Q13. Loyihada middleware har response bodyni bufferlab streamingni buzmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin cross-cutting header/timingni yengil HTTP middlewareda, body transformni response qatlamida qiling. Masalan, `response = await call_next(request)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/middleware/).

## Q14. Loyihada PATCH yo'q maydonlarni default bilan bosib yubormoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin model_dump(exclude_unset=True) bilan faqat yuborilgan fieldlarni qo'llang. Masalan, `stored.model_copy(update=patch.model_dump(exclude_unset=True))` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/body-updates/).

## Q15. Loyihada sync TestClientdan tashqari async database kodini ham test qilish kerak. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin HTTPX AsyncClient va pytest anyio bilan to'liq async test yozing. Masalan, `async with AsyncClient(transport=ASGITransport(app=app)) as client: ...` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/async-tests/).

## Q16. Loyihada bearer token yo'q request 403 va noto'g'ri challenge qaytarmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin OAuth2PasswordBearer dependency bilan standart 401 oqimini ishlating. Masalan, `oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/security/first-steps/).

## Q17. Loyihada client yuborgan Content-Type bilan actual response mos emas. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Response classni endpoint kontraktiga aniq tanlang. Masalan, `return StreamingResponse(iterator, media_type='text/csv')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/custom-response/).

## Q18. Loyihada bir xil query pagination limitisiz databasega juda ko'p qator so'ramoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Query constraint bilan limitni boundaryda cheklang. Masalan, `limit: Annotated[int, Query(ge=1, le=100)] = 50` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/query-params-str-validations/).

## Q19. Loyihada reverse proxy ostida client IP va HTTPS scheme noto'g'ri ko'rinmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin faqat ishonchli proxy headerlarini server konfiguratsiyasida qabul qiling. Masalan, `fastapi run --proxy-headers --forwarded-allow-ips=10.0.0.1` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/advanced/behind-a-proxy/).

## Q20. Loyihada OpenAPI schema ichki admin route va umumiy client route aralashib ketdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin router tags va include_in_schema bilan public contractni aniq ajrating. Masalan, `@app.get('/internal', include_in_schema=False)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://fastapi.tiangolo.com/tutorial/path-operation-configuration/).

