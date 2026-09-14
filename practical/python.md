# Python amaliy interview ssenariylari

Ushbu bank amaliy vaziyatlar uchun tuzilgan. Asosiy rasmiy manba: [python hujjatlari](https://docs.python.org/3/).

## Q1. Loyihada async servisda bitta tashqi API javob bermay, qolgan vazifalar ham osilib qoldi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin har chaqiruvga timeout qo'ying va bog'liq vazifalarni TaskGroup bilan boshqaring. Masalan, `async with asyncio.timeout(3): await client.get(url)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/asyncio-task.html#timeouts).

## Q2. Loyihada CPU talab qiladigan fayl konvertatsiyasi event loopni to'xtatib qo'ydi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin CPU ishini process poolga ajrating va event loopda faqat I/O qoldiring. Masalan, `await loop.run_in_executor(process_pool, convert, path)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor).

## Q3. Loyihada parallel korutinalardan biri yiqilganda qolganlari bekor qilinmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin structured concurrency uchun TaskGroup ishlating va ExceptionGroupni chegarada tuting. Masalan, `async with asyncio.TaskGroup() as tg: tg.create_task(job())` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/asyncio-task.html#task-groups).

## Q4. Loyihada katta CSV faylni o'qishda process xotirasi keskin oshmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin faylni iterator orqali qatorma-qator oqim sifatida qayta ishlang. Masalan, `with open(path, newline='') as f: rows = csv.DictReader(f)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/csv.html).

## Q5. Loyihada test real HTTP servisga chiqib, CI natijasi beqaror bo'lib qoldi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin dependency ishlatilgan joyda autospec bilan patch qiling va chaqiruvni tekshiring. Masalan, `with patch('app.client.get', autospec=True) as get: ...` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/unittest.mock.html#where-to-patch).

## Q6. Loyihada konfiguratsiya obyektida mutable default ro'yxatlar instansiyalar orasida bo'lishilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin dataclass maydonida default_factory ishlating. Masalan, `items: list[str] = field(default_factory=list)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/dataclasses.html#dataclasses.field).

## Q7. Loyihada loglarda request konteksti yo'q va xatoni foydalanuvchiga bog'lash qiyin. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin LoggerAdapter yoki filter bilan request_idni structured maydon sifatida qo'shing. Masalan, `logger = logging.LoggerAdapter(base, {'request_id': rid})` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/howto/logging-cookbook.html#adding-contextual-information-to-your-logging-output).

## Q8. Loyihada vaqtinchalik fayl exception paytida diskda qolib ketmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin TemporaryDirectory context manager bilan cleanupni kafolatlang. Masalan, `with tempfile.TemporaryDirectory() as tmp: build(tmp)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/tempfile.html#tempfile.TemporaryDirectory).

## Q9. Loyihada API token yaratishda random modulidan foydalanilgan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin kriptografik token uchun secrets moduliga o'ting. Masalan, `token = secrets.token_urlsafe(32)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/secrets.html).

## Q10. Loyihada webhook imzosini oddiy tenglik bilan solishtirish timing leak xavfini berdi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin hisoblangan digestlarni compare_digest bilan tekshiring. Masalan, `hmac.compare_digest(expected, received)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/hmac.html#hmac.compare_digest).

## Q11. Loyihada JSON pul qiymatlari floatga aylanganda tiyin xatolari chiqmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin parse_float orqali Decimal ishlating va chiqishni aniq formatlang. Masalan, `json.loads(body, parse_float=Decimal)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/json.html#json.loads).

## Q12. Loyihada katta dict nusxasi ichki listlarni ham mustaqil qiladi deb o'ylangan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin shallow va deep copy farqini test qilib, zarur joyda deepcopy ishlating. Masalan, `isolated = copy.deepcopy(config)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/copy.html).

## Q13. Loyihada worker thread exceptioni yo'qolib, batch qisman ishlayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin Future.result orqali xatoni yig'ing yoki executor.map natijasini iste'mol qiling. Masalan, `for result in executor.map(run, jobs): persist(result)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/concurrent.futures.html).

## Q14. Loyihada productionda xotira sizishi bor, lekin qaysi allocation o'sayotgani noma'lum. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin tracemalloc snapshotlarini taqqoslab eng katta farqlarni toping. Masalan, `before = tracemalloc.take_snapshot(); after.compare_to(before, 'lineno')` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/tracemalloc.html).

## Q15. Loyihada plugin nomi konfiguratsiyadan keladi va uzun if zanjiri paydo bo'lgan. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin importlib orqali aniq allowlistdagi modulni dinamik yuklang. Masalan, `module = importlib.import_module(ALLOWED[name])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/importlib.html#importlib.import_module).

## Q16. Loyihada CLI noto'g'ri argumentda stack trace chiqarib, foydalanuvchiga yordam bermayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin argparse type va choices bilan kirishni chegaralang. Masalan, `parser.add_argument('--mode', choices=['dry-run','apply'])` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/argparse.html).

## Q17. Loyihada fayl yo'llari Windows va Linuxda turlicha biriktirilmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin string concat o'rniga pathlib.Path ishlating. Masalan, `target = Path(root) / 'reports' / filename` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/pathlib.html).

## Q18. Loyihada context manager ichida ochilgan connection xatoda yopilmayapti. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin contextlib.contextmanagerda try/finally bilan release qiling. Masalan, `try: yield conn
finally: pool.release(conn)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager).

## Q19. Loyihada cache dekoratori mutable yoki userga bog'liq natijani noto'g'ri ulashmoqda. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin faqat hashable argumentli pure hisobni cache qiling va maxsiz cache xavfini o'lchang. Masalan, `@functools.lru_cache(maxsize=1024)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/functools.html#functools.lru_cache).

## Q20. Loyihada timezone-siz datetime sabab DST paytida buyurtma vaqti siljidi. Buni qanday diagnostika qilib, xavfsiz hal qilasiz?

**Javob:** Avval muammoni minimal reproduksiya, log yoki profiling bilan tasdiqlang; keyin UTC aware datetime saqlang va faqat UI chegarasida lokal zonaga o'tkazing. Masalan, `created_at = datetime.now(timezone.utc)` ni kichik testda qo'llang. O'zgarishdan oldin va keyin xato yo'li, natija hamda latency/xotira ko'rsatkichini tekshiring; rollback chegarasini yozib qo'ying. [Rasmiy manba](https://docs.python.org/3/library/datetime.html#aware-and-naive-objects).

