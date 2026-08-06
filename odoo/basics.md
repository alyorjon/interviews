# 🟣 Odoo Development Framework — Theory & 100 Real-World Interview Questions
### Ikki tilli qo'llanma / Bilingual Guide (O'zbek 🇺🇿 & English 🇬🇧)

> **Daraja / Level:** Boshlang'ich (Basic) 🟢 → O'rta (Intermediate) 🟡 → Ilg'or (Advanced) 🔴 → Ekspert (Expert) ⚫  
> **Tillar / Languages:** O'zbek 🇺🇿 | English 🇬🇧  
> **Maqsad / Goal:** Odoo 16/17+ ekotizimini, ORM, OWL JS, QWeb, xavfsizlik va arxitekturasini chuqur o'rganish va texnik intervyularga 100% tayyorgarlik ko'rish.

---

## 📚 Mundarija / Table of Contents

- [PART 1: ODOO THEORY & ARCHITECTURE (Nazariya)](#part-1-odoo-theory--architecture-nazariya)
  - [1. Odoo Framework Overview](#1-odoo-framework-overview)
  - [2. Odoo ORM & Data Models](#2-odoo-orm--data-models)
  - [3. Fields API](#3-fields-api)
  - [4. Environment & Recordsets](#4-environment--recordsets)
  - [5. API Decorators](#5-api-decorators)
  - [6. Security & Access Rights](#6-security--access-rights)
  - [7. Views & QWeb Engine](#7-views--qweb-engine)
  - [8. Controllers & External APIs](#8-controllers--external-apis)
  - [9. Module Structure & Manifest](#9-module-structure--manifest)
  - [10. Deployment & Performance Tuning](#10-deployment--performance-tuning)
- [PART 2: 100 REAL-WORLD ODOO INTERVIEW QUESTIONS & ANSWERS](#part-2-100-real-world-odoo-interview-questions--answers)
  - [🟢 Boshlang'ich daraja / Basic Level (Q1 – Q25)](#-boshlangich-daraja--basic-level-q1--q25)
  - [🟡 O'rta daraja / Intermediate Level (Q26 – Q55)](#-orta-daraja--intermediate-level-q26--q55)
  - [🔴 Ilg'or daraja / Advanced Level (Q56 – Q80)](#-ilgor-daraja--advanced-level-q56--q80)
  - [⚫ Ekspert daraja / Expert Level (Q81 – Q100)](#-ekspert-daraja--expert-level-q81--q100)

---

# PART 1: ODOO THEORY & ARCHITECTURE (Nazariya)

---

## 1. Odoo Framework Overview

### Architecture & Tech Stack (Arxitektura va Texnik Stek)
**EN:** Odoo is a multi-tier, modular enterprise application framework built primarily in **Python 3** and backed by **PostgreSQL**. The web stack uses **Werkzeug** as its WSGI HTTP web server, while the client interface relies on **OWL (Odoo Web Library)**, a modern component-based JavaScript framework inspired by React and Vue.

**UZ:** Odoo — asosan **Python 3** tilida yozilgan va **PostgreSQL** ma'lumotlar bazasiga tayangan ko'p qatlamli, modulli korporativ ilovalar freymvorkidir. Veb-stek **Werkzeug** WSGI serveridan foydalanadi, front-end esa React va Vue g'oyalariga asoslangan **OWL (Odoo Web Library)** zamonaviy JavaScript komponent freymvorkiga tayanadi.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Browser (OWL JS Framework)              │
│               Single Page Application (SPA) / Bootstrap 5 / SCSS       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ HTTP / JSON-RPC / WebSockets
┌──────────────────────────────────▼─────────────────────────────────────┐
│                   Werkzeug WSGI Server & HTTP Router                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Request Context / Sessions
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       Odoo ORM & Business Logic Layer                  │
│     Models (models.Model) │ Security (ir.rule) │ Workflows / Services   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ SQL Queries (psycopg2)
┌──────────────────────────────────▼─────────────────────────────────────┐
│                    PostgreSQL Relational Database                      │
│            Tables, Indexes, Foreign Keys, Sequences, Triggers          │
└────────────────────────────────────────────────────────────────────────┘
```

### MVC Pattern Mapping (MVC Patterni Bilan Moslik)
| Component | Odoo Framework Implementation | Description (EN & UZ) |
| :--- | :--- | :--- |
| **Model** | `models.Model`, `models.TransientModel` | **EN:** Python classes mapping to PostgreSQL tables encapsulating data logic.<br>**UZ:** Ma'lumotlar mantig'ini o'z ichiga olgan Postgres jadvallariga bog'langan Python klasslari. |
| **View** | XML Views (`<form>`, `<tree>`, `<kanban>`), QWeb | **EN:** Declarative XML views and HTML templates rendered by OWL client or report engine.<br>**UZ:** OWL kliyenti yoki hisobot dvigateli tomonidan render qilinadigan XML ko'rinishlar va shablonlar. |
| **Controller** | `http.Controller`, `@http.route()` | **EN:** Endpoint handlers for web routing, external REST/JSON APIs, and file downloads.<br>**UZ:** Veb-marshrutlash, tashqi REST/JSON API va fayllarni yuklab olish uchun ishlovchilar. |

---

## 2. Odoo ORM & Data Models

Odoo provides three primary model base classes inheriting from `models.BaseModel`:

1. **`models.Model` (Persistent Model):**
   - Maps directly to a physical table in PostgreSQL.
   - Preserves data permanently unless explicitly deleted.
   - Example: `account.move`, `res.partner`, `product.template`.
2. **`models.TransientModel` (Wizard Model):**
   - Stored temporarily in PostgreSQL, auto-vacuumed periodically by cron jobs.
   - Used for interactive wizards, dialog popups, export configurations.
   - Example: `account.payment.register`, `stock.quantity.history`.
3. **`models.AbstractModel` (Abstract / Mixin Model):**
   - Does **not** create a PostgreSQL table.
   - Serves as a reusable Python/ORM base class for class inheritance and mixins.
   - Example: `mail.thread`, `mail.activity.mixin`, `utm.mixin`.

```python
from odoo import models, fields, api

# Persistent Model
class HospitalPatient(models.Model):
    _name = 'hospital.patient'
    _description = 'Patient Record'
    _order = 'create_date desc'
    _rec_name = 'name'

    name = fields.Char(string='Patient Name', required=True)
    age = fields.Integer(string='Age')

# Transient Model (Wizard)
class PatientReportWizard(models.TransientModel):
    _name = 'patient.report.wizard'
    _description = 'Patient Report Filter Wizard'

    date_from = fields.Date(string='Start Date', required=True)
    date_to = fields.Date(string='End Date', required=True)

# Abstract Model (Mixin)
class AuditTrailMixin(models.AbstractModel):
    _name = 'audit.trail.mixin'
    _description = 'Audit Trail Mixin'

    last_action_by = fields.Many2one('res.users', string='Last Action By')
```

---

## 3. Fields API

### Scalar & Special Fields (Skalar va Maxsus Maydonlar)
- **`Char`**: Fixed-length string (`varchar`).
- **`Text`**: Unlimited string (`text`).
- **`Html`**: Rich-text HTML content.
- **`Integer`**, **`Float`**: Numeric values.
- **`Monetary`**: Financial currency-aware float (requires `currency_field` attribute).
- **`Boolean`**: True/False boolean flag.
- **`Date`**, **`Datetime`**: Calendar dates and timestamps.
- **`Selection`**: Predefined list of key-value tuples or selection method.

### Relational Fields (Munosabat Maydonlari)
- **`Many2one`**: Foreign key pointing to a single record in target model (`INTEGER REFERENCES`).
- **`One2many`**: Virtual inverse of Many2one; returns recordset of child records.
- **`Many2many`**: N:M relationship backed by a relational join table.

```python
class SaleOrderCustom(models.Model):
    _name = 'sale.order.custom'
    _description = 'Custom Sale Order'

    currency_id = fields.Many2one('res.currency', string='Currency', default=lambda self: self.env.company.currency_id)
    total_amount = fields.Monetary(string='Total', currency_field='currency_id')
    
    partner_id = fields.Many2one('res.partner', string='Customer', ondelete='restrict', required=True)
    line_ids = fields.One2many('sale.order.custom.line', 'order_id', string='Order Lines')
    tag_ids = fields.Many2many('res.partner.category', 'sale_custom_tag_rel', 'order_id', 'tag_id', string='Tags')

    # Computed & Related Fields
    patient_name = fields.Char(related='partner_id.name', store=True, readonly=True)
    line_count = fields.Integer(compute='_compute_line_count', store=True)

    @api.depends('line_ids')
    def _compute_line_count(self):
        for rec in self:
            rec.line_count = len(rec.line_ids)
```

---

## 4. Environment & Recordsets

The **Environment (`self.env`)** is an immutable context container providing access to database cursors, authenticated user info, security contexts, and ORM recordsets.

```python
# Key Environment Components
cr = self.env.cr        # psycopg2 database cursor (raw SQL execution)
uid = self.env.uid      # Current user ID (integer)
user = self.env.user    # Current user record (res.users recordset)
company = self.env.company # Current active company record
context = self.env.context # Immutable context dict {'lang': 'en_US', 'tz': 'Asia/Tashkent'}

# Environment Modifications
admin_records = self.sudo()                              # Bypasses security rules (runs as SUPERUSER)
fr_records = self.with_context(lang='fr_FR')              # Clone recordset with French language context
comp_records = self.with_company(company_id)             # Clone recordset evaluating under company context

# Recordset Functional Methods
active_partners = self.env['res.partner'].search([('active', '=', True)])
partner_names = active_partners.mapped('name')           # Extract list of names: ['Alice', 'Bob']
filtered_partners = active_partners.filtered(lambda p: p.is_company) # Filter records with lambda
sorted_partners = active_partners.sorted(key=lambda p: p.name, reverse=True) # Sort records
```

---

## 5. API Decorators

| Decorator | Trigger Context | Description (EN & UZ) |
| :--- | :--- | :--- |
| **`@api.depends('field1', 'rel.field2')`** | Field compute re-evaluation | **EN:** Triggers dynamic recalculation when target fields change.<br>**UZ:** Belgilangan maydonlar o'zgarganda hisob-kitobni qayta ishga tushiradi. |
| **`@api.onchange('field_name')`** | Web Client UI event | **EN:** Client-side reactive trigger fired in web forms before save.<br>**UZ:** Veb-formada saqlashdan oldin mijoz interfeysida ishlovchi reaktiv trigger. |
| **`@api.constrains('field1')`** | ORM `create()` / `write()` | **EN:** Server-side validation executed before DB commit; raises `ValidationError`.<br>**UZ:** Bazaga saqlashdan oldin serverda ma'lumot to'g'riligini tekshiradi. |
| **`@api.model`** | Class-level execution | **EN:** Called without record context (`self` is an empty recordset).<br>**UZ:** Yozuv kontekstisiz chaqiriladi (`self` bo'sh recordset bo'ladi). |
| **`@api.model_create_multi`** | Batch creation | **EN:** Optimized decorator accepting a list of value dicts for batch insertion.<br>**UZ:** Bir nechta yozuvlarni bir vaqtda yaratish uchun optimallashtirilgan dekorator. |

```python
from odoo import models, fields, api
from odoo.exceptions import ValidationError

class HospitalAppointment(models.Model):
    _name = 'hospital.appointment'
    _description = 'Patient Appointment'

    patient_id = fields.Many2one('hospital.patient', string='Patient')
    age = fields.Integer(related='patient_id.age')
    fee = fields.Float(string='Consultation Fee')
    tax = fields.Float(string='Tax Amount', compute='_compute_tax', store=True)

    @api.depends('fee')
    def _compute_tax(self):
        for rec in self:
            rec.tax = rec.fee * 0.15

    @api.onchange('patient_id')
    def _onchange_patient_id(self):
        if self.patient_id:
            self.fee = 100.0 if self.patient_id.age > 60 else 150.0

    @api.constrains('fee')
    def _check_fee(self):
        for rec in self:
            if rec.fee < 0:
                raise ValidationError("Consultation fee cannot be negative! / Qabul narxi manfiy bo'lishi mumkin emas!")
```

---

## 6. Security & Access Rights

Odoo enforces security via two primary mechanisms:

1. **Model-Level Access Rights (`ir.model.access.csv`):**
   - Defines basic CRUD permissions (`perm_read`, `perm_write`, `perm_create`, `perm_unlink`) per User Group.
2. **Record-Level Rules (`ir.rule`):**
   - Filters accessible record rows dynamically using Python domain expressions.

### `ir.model.access.csv` Example:
```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_hospital_patient_user,hospital.patient.user,model_hospital_patient,group_hospital_user,1,1,1,0
access_hospital_patient_manager,hospital.patient.manager,model_hospital_patient,group_hospital_manager,1,1,1,1
```

### `ir.rule` XML Definition Example:
```xml
<record id="rule_hospital_patient_multi_company" model="ir.rule">
    <field name="name">Hospital Patient Multi-Company Rule</field>
    <field name="model_id" ref="model_hospital_patient"/>
    <field name="global" eval="True"/>
    <field name="domain_force">['|', ('company_id', '=', False), ('company_id', 'in', company_ids)]</field>
</record>
```

---

## 7. Views & QWeb Engine

### View Types & Hierarchy
- **Form View (`<form>`):** Detailed single-record editing interface.
- **Tree/List View (`<tree>`):** Tabular multi-record presentation.
- **Kanban View (`<kanban>`):** Card-based drag-and-drop workflow presentation.
- **Search View (`<search>`):** Filtering, searching, and `group_by` configurations.

### XML View Inheritance (`<xpath>`)
```xml
<record id="view_partner_form_inherit_hospital" model="ir.ui.view">
    <field name="name">res.partner.form.inherit.hospital</field>
    <field name="model">res.partner</field>
    <field name="inherit_id" ref="base.view_partner_form"/>
    <field name="arch" type="xml">
        <xpath expr="//field[@name='vat']" position="after">
            <field name="is_hospital_patient"/>
        </xpath>
    </field>
</record>
```

### QWeb Reporting Engine
QWeb is an XML templating engine used for rendering dynamic HTML/PDF documents via `wkhtmltopdf`. Key directives include `t-if`, `t-foreach`, `t-field`, `t-esc`, `t-call`, `t-set`.

```xml
<template id="report_patient_card_document">
    <t t-call="web.external_layout">
        <div class="page">
            <h2>Patient Card: <span t-field="doc.name"/></h2>
            <p t-if="doc.age &gt; 18">Status: Adult</p>
            <table class="table table-bordered">
                <thead>
                    <tr><th>Appointment Date</th><th>Doctor</th></tr>
                </thead>
                <tbody>
                    <tr t-foreach="doc.appointment_ids" t-as="app">
                        <td><span t-field="app.date"/></td>
                        <td><span t-field="app.doctor_id.name"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </t>
</template>
```

---

## 8. Controllers & External APIs

### Web Controllers (`http.Controller`)
Controllers handle incoming HTTP routes, webhooks, and REST/JSON endpoints.

```python
from odoo import http
from odoo.http import request, Response
import json

class HospitalAPIController(http.Controller):

    @http.route('/api/patients', type='json', auth='user', methods=['POST'], csrf=False)
    def get_patients(self, **kwargs):
        patients = request.env['hospital.patient'].search_read([], ['id', 'name', 'age'])
        return {'status': 'success', 'data': patients}

    @http.route('/public/patient/count', type='http', auth='public', methods=['GET'], csrf=False)
    def patient_count(self, **kw):
        count = request.env['hospital.patient'].sudo().search_count([])
        payload = json.dumps({'total_patients': count})
        return Response(payload, content_type='application/json', status=200)
```

---

## 9. Module Structure & Manifest

A standard custom Odoo module directory layout:

```
custom_hospital/
├── __init__.py
├── __manifest__.py
├── controllers/
│   ├── __init__.py
│   └── main.py
├── data/
│   └── sequence_data.xml
├── models/
│   ├── __init__.py
│   ├── patient.py
│   └── appointment.py
├── reports/
│   └── patient_report.xml
├── security/
│   ├── ir.model.access.csv
│   └── security_group.xml
├── static/
│   └── src/
│       ├── js/
│       └── xml/
└── views/
    ├── patient_views.xml
    └── appointment_views.xml
```

### `__manifest__.py` Example:
```python
{
    'name': 'Hospital Management System',
    'version': '17.0.1.0.0',
    'category': 'Healthcare',
    'summary': 'Manage Patients, Doctors and Appointments',
    'author': 'Interview Content Architect',
    'website': 'https://example.com',
    'license': 'LGPL-3',
    'depends': ['base', 'mail'],
    'data': [
        'security/security_group.xml',
        'security/ir.model.access.csv',
        'data/sequence_data.xml',
        'views/patient_views.xml',
        'reports/patient_report.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'custom_hospital/static/src/js/custom_widget.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
```

---

## 10. Deployment & Performance Tuning

### Multi-Worker Scaling Configuration
For production deployments, Odoo should run in multi-worker mode using WSGI workers. Formula for calculating worker processes:
$$\text{Workers} = (2 \times \text{CPU Cores}) + 1$$

`odoo.conf` production configuration snippet:
```ini
[options]
processes = 4
gevent_port = 8072
limit_memory_hard = 2684354560
limit_memory_soft = 2147483648
limit_request = 8192
limit_time_cpu = 600
limit_time_real = 1200
max_cron_threads = 2
```

### ORM Query Optimization Tips
- Avoid calling `search()` inside a `for` loop (N+1 query issue). Use `mapped()` or batch domain searches.
- Use `search_read()` or `read_group()` instead of browsing full recordsets when only specific fields/aggregates are needed.
- Add DB index (`index=True`) on fields frequently filtered in `domain` or used in `order`.

---

# PART 2: 100 REAL-WORLD ODOO INTERVIEW QUESTIONS & ANSWERS

---

## 🟢 Boshlang'ich daraja / Basic Level (Q1 – Q25)

---

### Q1. What is Odoo and what architecture does it use? | Odoo nima va u qanday arxitekturadan foydalanadi?

**EN:** Odoo is an open-source suite of business applications (ERP/CRM). It uses a 3-tier architecture: Python WSGI backend server, PostgreSQL relational database, and an OWL (Odoo Web Library) single-page application frontend.

**UZ:** Odoo — biznes boshqaruvi uchun mo'ljallangan ochiq manbali ERP/CRM tizimi. U 3 qatlamli arxitekturadan foydalanadi: Python WSGI server backend, PostgreSQL ma'lumotlar bazasi va OWL JS frontend interfeysi.

```python
# Example of Odoo's 3-tier model layer declaration
from odoo import models, fields

class DemoModel(models.Model):
    _name = 'demo.model'
    _description = 'Demo Model for Architecture Example'

    name = fields.Char(string='Name', required=True)
```

---

### Q2. What is `__manifest__.py` and what are its key keys? | `__manifest__.py` nima va uning asosiy kalitlari qaysilar?

**EN:** `__manifest__.py` is the descriptor file of an Odoo module. It defines module metadata such as `name`, `version`, `depends`, `data` (XML/CSV security & views), `assets`, and `installable`.

**UZ:** `__manifest__.py` — Odoo modulining tavsiflovchi fayli. U modul nomi (`name`), versiyasi (`version`), bog'liqliklar (`depends`), ma'lumotlar fayllari (`data`) va aktivlar (`assets`) kabi metama'lumotlarni belgilaydi.

```python
{
    'name': 'Basic Module',
    'version': '17.0.1.0.0',
    'depends': ['base'],
    'data': ['security/ir.model.access.csv'],
    'installable': True,
    'license': 'LGPL-3',
}
```

---

### Q3. How to define a persistent Model in Odoo? | Odoo-da qanday qilib persistent Model aniqlanadi?

**EN:** A persistent model inherits from `models.Model` and specifies attributes `_name` and `_description`. Odoo automatically creates the corresponding PostgreSQL table.

**UZ:** Persistent model `models.Model` sinfidan meros oladi hamda `_name` va `_description` atributlarini beradi. Odoo avtomatik ravishda unga mos Postgres jadvalini yaratadi.

```python
from odoo import models, fields

class LibraryBook(models.Model):
    _name = 'library.book'
    _description = 'Library Book'

    name = fields.Char(string='Title', required=True)
    isbn = fields.Char(string='ISBN')
```

---

### Q4. What is the difference between `models.Model`, `models.TransientModel`, and `models.AbstractModel`? | `models.Model`, `models.TransientModel` va `models.AbstractModel` farqlari nima?

**EN:** `models.Model` creates a permanent DB table. `models.TransientModel` creates a temporary table auto-cleaned by vacuum cron (used for wizards). `models.AbstractModel` creates no table, serving only as a reusable mixin class.

**UZ:** `models.Model` doimiy ma'lumotlar bazasi jadvalini yaratadi. `models.TransientModel` vaqtinchalik jadval yaratadi va wizardlar uchun ishlatiladi. `models.AbstractModel` esa umuman jadval yaratmaydi va faqat qayta ishlatiladigan mixin sinfi vazifasini o'taydi.

```python
# Permanent Model
class CoreData(models.Model):
    _name = 'core.data'

# Temporary Wizard Model
class QuickWizard(models.TransientModel):
    _name = 'quick.wizard'

# Abstract Mixin Model
class CommonMixin(models.AbstractModel):
    _name = 'common.mixin'
```

---

### Q5. How do basic scalar fields work in Odoo (Char, Integer, Float, Boolean, Date, Datetime)? | Odoo-da asosiy skalar maydonlar qanday ishlaydi?

**EN:** Scalar fields store simple primitive values directly in table columns (VARCHAR, INTEGER, DOUBLE PRECISION, BOOLEAN, DATE, TIMESTAMP).

**UZ:** Skalar maydonlar oddiy ma'lumot turidagi qiymatlarni (matn, son, sana, mantiqiy) ma'lumotlar bazasining ustunlarida saqlaydi.

```python
from odoo import models, fields

class ScalarDemo(models.Model):
    _name = 'scalar.demo'

    title = fields.Char(string='Title', default='New')
    count = fields.Integer(string='Count', default=1)
    price = fields.Float(string='Price', digits=(10, 2))
    is_active = fields.Boolean(string='Active', default=True)
    start_date = fields.Date(string='Start Date', default=fields.Date.today)
    created_at = fields.Datetime(string='Timestamp', default=fields.Datetime.now)
```

---

### Q6. How do Selection fields work and how do you dynamicize them? | Selection maydonlari qanday ishlaydi va ularni qanday dinamik qilish mumkin?

**EN:** Selection fields store string keys mapped to human-readable labels. They accept static tuple lists or dynamic Python callable functions returning tuple lists.

**UZ:** Selection maydonlari foydalanuvchiga tanlash uchun ro'yxat beradi. Ular statik kortejlar ro'yxatini yoki dinamik Python funksiyalarini qabul qilishi mumkin.

```python
from odoo import models, fields

class SelectionDemo(models.Model):
    _name = 'selection.demo'

    status = fields.Selection([
        ('draft', 'Draft / Qoralama'),
        ('approved', 'Approved / Tasdiqlangan'),
    ], string='Status', default='draft')

    dynamic_choice = fields.Selection(selection='_get_dynamic_choices', string='Dynamic Choice')

    def _get_dynamic_choices(self):
        return [('opt1', 'Option 1'), ('opt2', 'Option 2')]
```

---

### Q7. What is a `Many2one` field and how is it declared? | `Many2one` maydoni nima va u qanday e'lon qilinadi?

**EN:** `Many2one` creates a foreign key linking the current model to a target model, enabling single-record references.

**UZ:** `Many2one` joriy modelni boshqa maqsadli model bilan bog'laydigan tashqi kalit (foreign key) yaratadi.

```python
class BookAuthor(models.Model):
    _name = 'library.author'
    name = fields.Char(string='Author Name')

class LibraryBook(models.Model):
    _name = 'library.book'
    author_id = fields.Many2one('library.author', string='Author', ondelete='cascade')
```

---

### Q8. What is a `One2many` field and what parameters does it require? | `One2many` maydoni nima va u qaysi parametrlarni talab qiladi?

**EN:** `One2many` is a virtual field representing child records. It requires the target model name and the name of the `Many2one` foreign key field on that target model.

**UZ:** `One2many` — bu virtual maydon bo'lib, unga bog'langan bolalar (child) yozuvlarini ko'rsatadi. U target model nomi va u yerdagi `Many2one` maydoni nomini talab qiladi.

```python
class LibraryAuthor(models.Model):
    _name = 'library.author'
    name = fields.Char(string='Author Name')
    book_ids = fields.One2many('library.book', 'author_id', string='Books')

class LibraryBook(models.Model):
    _name = 'library.book'
    author_id = fields.Many2one('library.author', string='Author')
```

---

### Q9. What is a `Many2many` field and how is the relation table created under the hood? | `Many2many` maydoni nima va uning munosabat jadvali qanday yaratiladi?

**EN:** `Many2many` defines an N:M relation. Odoo automatically creates an intermediate join table containing pair references of foreign keys.

**UZ:** `Many2many` ikki model o'rtasida ko'pdan-ko'pga munosabatni o'rnatadi. Odoo avtomatik ravishda oraliq bog'lovchi jadval va foreign key-larni yaratadi.

```python
class BookTag(models.Model):
    _name = 'book.tag'
    name = fields.Char(string='Tag')

class LibraryBook(models.Model):
    _name = 'library.book'
    tag_ids = fields.Many2many(
        comodel_name='book.tag',
        relation='library_book_tag_rel',
        column1='book_id',
        column2='tag_id',
        string='Tags'
    )
```

---

### Q10. How do computed fields (`compute`) work in Odoo? | Odoo-da hisoblanadigan (`compute`) maydonlar qanday ishlaydi?

**EN:** Computed fields calculate their value dynamically using a Python method decorated with `@api.depends()`. By default they are non-stored (computed on-the-fly) unless `store=True` is specified.

**UZ:** Compute maydonlari qiymatini Python metodi orqali dinamik hisoblaydi. Odatiy holda ular bazada saqlanmaydi, agar `store=True` berilmasa.

```python
class OrderLine(models.Model):
    _name = 'demo.order.line'

    quantity = fields.Integer(string='Qty', default=1)
    unit_price = fields.Float(string='Price')
    subtotal = fields.Float(string='Subtotal', compute='_compute_subtotal', store=True)

    @api.depends('quantity', 'unit_price')
    def _compute_subtotal(self):
        for line in self:
            line.subtotal = line.quantity * line.unit_price
```

---

### Q11. How do related fields (`related`) work? | Bog'langan (`related`) maydonlar qanday ishlaydi?

**EN:** Related fields shortcut field access across `Many2one` relational paths (e.g. `partner_id.company_id.name`).

**UZ:** Related maydonlar `Many2one` bog'lanishlari orqali boshqa modeldagi maydon qiymatini qisqa yo'l bilan olish uchun xizmat qiladi.

```python
class LibraryBook(models.Model):
    _name = 'library.book'

    author_id = fields.Many2one('library.author', string='Author')
    author_country_id = fields.Many2one(
        related='author_id.country_id',
        string='Author Country',
        store=True,
        readonly=True
    )
```

---

### Q12. What is `self.env` in Odoo and what components does it contain? | Odoo-da `self.env` nima va u qaysi komponentlarni o'z ichiga oladi?

**EN:** `self.env` is the Environment object containing DB cursor (`cr`), user ID (`uid`), user object (`user`), active company (`company`), and context (`context`).

**UZ:** `self.env` — bu Environment ob'ekti bo'lib, o'zida baza kursorini (`cr`), foydalanuvchi ID-sini (`uid`), foydalanuvchi ob'ektini (`user`), faol kompaniyani (`company`) va kontekstni (`context`) saqlaydi.

```python
def print_env_info(self):
    print("Cursor:", self.env.cr)
    print("Current User ID:", self.env.uid)
    print("User Name:", self.env.user.name)
    print("Language:", self.env.context.get('lang'))
```

---

### Q13. How do you create a basic Form View in XML? | XML-da qanday qilib oddiy Form View yaratiladi?

**EN:** Form views are declared in XML under `<record model="ir.ui.view">` using `<form>`, `<sheet>`, `<group>`, and `<field>` tags.

**UZ:** Form ko'rinishlari XML faylda `<record model="ir.ui.view">` tegi ichida `<form>`, `<sheet>`, `<group>` va `<field>` teglari yordamida yaratiladi.

```xml
<record id="view_library_book_form" model="ir.ui.view">
    <field name="name">library.book.form</field>
    <field name="model">library.book</field>
    <field name="arch" type="xml">
        <form string="Book">
            <sheet>
                <group>
                    <field name="name"/>
                    <field name="isbn"/>
                    <field name="author_id"/>
                </group>
            </sheet>
        </form>
    </field>
</record>
```

---

### Q14. How do you create a List (Tree) View in XML? | XML-da qanday qilib List (Tree) View yaratiladi?

**EN:** Tree views display records in tabular format using `<tree>` tag containing `<field>` definitions.

**UZ:** Tree/List ko'rinishlari yozuvlarni jadval ko'rinishida chiqarish uchun `<tree>` tegi va undagi `<field>` lardan foydalanadi.

```xml
<record id="view_library_book_tree" model="ir.ui.view">
    <field name="name">library.book.tree</field>
    <field name="model">library.book</field>
    <field name="arch" type="xml">
        <tree string="Books">
            <field name="name"/>
            <field name="isbn"/>
            <field name="author_id"/>
        </tree>
    </field>
</record>
```

---

### Q15. How do you create a Search View with filters and group-by options? | Qanday qilib filter va group-by opsiyalari bilan Search View yaratiladi?

**EN:** Search views define search bar capabilities, predefined `<filter>` presets, and `<group expand="0" string="Group By">` groupings.

**UZ:** Search View qidiruv paneli sozlamalarini, tayyor `<filter>`-larni va guruhlash (`group_by`) opsiyalarini belgilaydi.

```xml
<record id="view_library_book_search" model="ir.ui.view">
    <field name="name">library.book.search</field>
    <field name="model">library.book</field>
    <field name="arch" type="xml">
        <search string="Search Books">
            <field name="name"/>
            <field name="isbn"/>
            <filter string="Archived" name="archived" domain="[('active', '=', False)]"/>
            <group expand="0" string="Group By">
                <filter string="Author" name="group_author" context="{'group_by': 'author_id'}"/>
            </group>
        </search>
    </field>
</record>
```

---

### Q16. How do you register a menu item and window action in Odoo XML? | Odoo XML-da menu item va window action qanday ro'yxatdan o'tkaziladi?

**EN:** Window actions (`ir.actions.act_window`) connect models and view modes (`tree,form`), which are then referenced by menu items (`<menuitem>`).

**UZ:** Window action model va ko'rinishlarni bog'laydi, so'ngra `<menuitem>` orqali ushbu action ekranga chiqariladi.

```xml
<record id="action_library_book" model="ir.actions.act_window">
    <field name="name">Books</field>
    <field name="res_model">library.book</field>
    <field name="view_mode">tree,form</field>
</record>

<menuitem id="menu_library_root" name="Library"/>
<menuitem id="menu_library_book" name="Books" parent="menu_library_root" action="action_library_book"/>
```

---

### Q17. What is `ir.model.access.csv` and what do its columns represent? | `ir.model.access.csv` nima va uning ustunlari nimani anglatadi?

**EN:** CSV security access file setting CRUD permissions per group for a target model. Columns: `id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink`.

**UZ:** Tizimdagi guruhlar uchun model darajasidagi o'qish, yozish, yaratish va o'chirish huquqlarini belgilovchi CSV fayli.

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_library_book_user,library.book.user,model_library_book,base.group_user,1,1,1,0
```

---

### Q18. How to perform basic ORM searches using `search()` and `search_count()`? | `search()` va `search_count()` yordamida asosiy ORM qidiruvlari qanday bajariladi?

**EN:** `search(domain)` returns a recordset matching domain filters. `search_count(domain)` returns integer count without creating recordset objects.

**UZ:** `search(domain)` domenga mos keluvchi recordset qaytaradi. `search_count(domain)` esa faqat mos yozuvlar sonini (integer) qaytaradi.

```python
# Search records
books = self.env['library.book'].search([('author_id.name', '=', 'Tolstoy')], limit=10)

# Count records
count = self.env['library.book'].search_count([('active', '=', True)])
```

---

### Q19. How to use `browse()` to load records by IDs? | ID-lar bo'yicha yozuvlarni yuklash uchun `browse()`-dan qanday foydalaniladi?

**EN:** `browse(ids)` converts single integer ID or list of IDs directly into an ORM recordset without performing immediate DB queries.

**UZ:** `browse(ids)` uzatilgan ID yoki ID-lar ro'yxatini to'g'ridan-to'g'ri ORM recordset ob'ektiga aylantirib beradi.

```python
book = self.env['library.book'].browse(42)
multiple_books = self.env['library.book'].browse([1, 2, 3])
```

---

### Q20. How to create records using `create()` in Odoo ORM? | Odoo ORM-da `create()` orqali yozuvlar qanday yaratiladi?

**EN:** `create(vals)` receives a dictionary (or list of dicts with `@api.model_create_multi`) and inserts records into PostgreSQL.

**UZ:** `create(vals)` lug'at ko'rinishidagi qiymatlarni qabul qilib, ma'lumotlar bazasida yangi yozuv yaratadi.

```python
new_book = self.env['library.book'].create({
    'name': 'War and Peace',
    'isbn': '978-0140447934',
})
```

---

### Q21. How to update records using `write()` in Odoo ORM? | Odoo ORM-da `write()` yordamida yozuvlar qanday yangilanadi?

**EN:** `write(vals)` executes an UPDATE statement on all records contained in the target recordset using dictionary values.

**UZ:** `write(vals)` joriy recordset tarkibidagi barcha yozuvlar uchun UPDATE SQL so'rovini bajarib ularni yangilaydi.

```python
books = self.env['library.book'].search([('isbn', '=', False)])
books.write({'isbn': 'PENDING_ASSIGNMENT'})
```

---

### Q22. How to delete records using `unlink()`? | `unlink()` yordamida yozuvlar qanday o'chiriladi?

**EN:** `unlink()` deletes record rows from PostgreSQL table (raises error if foreign key constraints are violated).

**UZ:** `unlink()` yozuvlarni ma'lumotlar bazasidan to'liq o'chiradi (agar foreign key cheklovlari bo'lsa xatolik berishi mumkin).

```python
books_to_delete = self.env['library.book'].search([('name', '=', 'Deprecated')])
books_to_delete.unlink()
```

---

### Q23. What is `@api.depends` decorator and why is it mandatory for stored compute fields? | `@api.depends` dekoratori nima va nima uchun u saqlanadigan compute maydonlar uchun shart?

**EN:** `@api.depends` registers trigger fields so Odoo knows when to invalidate cache and recompute stored values upon dependency field mutation.

**UZ:** `@api.depends` bog'liq maydonlarni ro'yxatga oladi. Saqlanuvchi (`store=True`) compute maydonlar u o'zgarganda qayta hisoblanishi uchun ushbu dekorator shart.

```python
total = fields.Float(compute='_compute_total', store=True)

@api.depends('price', 'tax')
def _compute_total(self):
    for rec in self:
        rec.total = rec.price + rec.tax
```

---

### Q24. What is `@api.onchange` and how does it differ from `@api.depends`? | `@api.onchange` nima va u `@api.depends` dan qanday farq qiladi?

**EN:** `@api.onchange` executes purely in the browser user interface before data is saved. `@api.depends` handles backend data calculations and DB storage.

**UZ:** `@api.onchange` faqat brauzer interfeysida ma'lumotlar saqlanishidan oldin ishlaydi. `@api.depends` esa server backend hisob-kitoblari va bazada saqlash uchun ishlatiladi.

```python
@api.onchange('partner_id')
def _onchange_partner(self):
    if self.partner_id:
        self.email = self.partner_id.email
```

---

### Q25. How to define sequence numbers (auto-incrementing codes like `INV/2026/0001`) in Odoo? | Odoo-da ketma-ketlik raqamlarini (`ir.sequence`) qanday aniqlash mumkin?

**EN:** Odoo provides `ir.sequence` model to generate formatted dynamic document numbers using `self.env['ir.sequence'].next_by_code('seq.code')`.

**UZ:** Odoo-da `ir.sequence` modellashtirish tizimi orqali hujjatlar uchun avtomatik ketma-ket raqamlash kodi beriladi.

```xml
<!-- Sequence XML Definition -->
<record id="seq_hospital_patient" model="ir.sequence">
    <field name="name">Patient Sequence</field>
    <field name="code">hospital.patient.seq</field>
    <field name="prefix">PAT/2026/</field>
    <field name="padding">4</field>
</record>
```

```python
# Python Usage inside create()
@api.model_create_multi
def create(self, vals_list):
    for vals in vals_list:
        if vals.get('code', 'New') == 'New':
            vals['code'] = self.env['ir.sequence'].next_by_code('hospital.patient.seq') or 'New'
    return super().create(vals_list)
```

---

## 🟡 O'rta daraja / Intermediate Level (Q26 – Q55)

---

### Q26. How does model inheritance (`_inherit`) work in Odoo (In-place vs Extension)? | Odoo-da model merosxo'rligi (`_inherit`) qanday ishlaydi?

**EN:** Extending an existing model using `_inherit = 'res.partner'` modifies the original model in-place. If `_name = 'custom.partner'` is also provided, it creates a new child model inheriting existing fields.

**UZ:** Mavjud modelni `_inherit = 'res.partner'` bilan kengaytirish uni o'z joyida o'zgartiradi (In-place). Agar `_name = 'custom.partner'` ham qo'shilsa, yangi alohida model yaratiladi.

```python
# In-place extension of core model
class ResPartnerInherit(models.Model):
    _inherit = 'res.partner'

    vip_code = fields.Char(string='VIP Code')
```

---

### Q27. What is classical prototyping inheritance vs delegation inheritance (`_inherits`)? | Prototip ko'rinishidagi merosxo'rlik va delegatsiyali merosxo'rlik (`_inherits`) o'rtasidagi farq nima?

**EN:** Delegation inheritance (`_inherits = {'parent.model': 'foreign_key_id'}`) embeds parent model fields seamlessly into child model via transparent `Many2one` relationship.

**UZ:** Delegatsiyali merosxo'rlik (`_inherits`) Odoo-da ota model maydonlarini bola modelga `Many2one` bog'lanish orqali shamshirdek transparent joylashtiradi.

```python
class CustomUser(models.Model):
    _name = 'custom.user'
    _inherits = {'res.users': 'user_id'}

    user_id = fields.Many2one('res.users', required=True, ondelete='cascade')
    employee_badge = fields.Char(string='Badge ID')
```

---

### Q28. How does XML View Inheritance work using `<xpath>`? | `<xpath>` yordamida XML View Merosxo'rligi qanday ishlaydi?

**EN:** XML inheritance references parent view via `inherit_id` and injects/modifies XML elements using `<xpath expr="..." position="before|after|replace|inside|attributes">`.

**UZ:** XML merosxo'rligi ota ko'rinishni `inherit_id` orqali ko'rsatadi va `<xpath>` teglari yordamida uning elementlarini joylashtiradi yoki o'zgartiradi.

```xml
<record id="view_partner_form_add_vip" model="ir.ui.view">
    <field name="name">res.partner.form.vip</field>
    <field name="model">res.partner</field>
    <field name="inherit_id" ref="base.view_partner_form"/>
    <field name="arch" type="xml">
        <xpath expr="//field[@name='category_id']" position="after">
            <field name="vip_code"/>
        </xpath>
    </field>
</record>
```

---

### Q29. How to use `@api.constrains` for server-side python validation? | Server tomonidagi Python tekshiruvi uchun `@api.constrains`-dan qanday foydalaniladi?

**EN:** `@api.constrains` defines Python constraint logic. If validation fails, it must raise `odoo.exceptions.ValidationError`.

**UZ:** `@api.constrains` serverda ma'lumotlarni tekshirish logikasini belgilaydi. Shart bajarilmasa, `ValidationError` istisnosini otadi.

```python
from odoo import models, fields, api
from odoo.exceptions import ValidationError

class Doctor(models.Model):
    _name = 'hospital.doctor'

    experience_years = fields.Integer(string='Experience (Years)')

    @api.constrains('experience_years')
    def _check_experience(self):
        for rec in self:
            if rec.experience_years < 0:
                raise ValidationError("Experience years cannot be negative!")
```

---

### Q30. What is `@api.model_create_multi` and why is it best practice for `create()`? | `@api.model_create_multi` nima va nima uchun u `create()` uchun eng yaxshi amaliyot hisoblanadi?

**EN:** Decorates `create()` to accept a list of value dictionaries (`vals_list`), enabling PostgreSQL batch insert queries for high performance.

**UZ:** `create()` metodini qiymatlar lug'atlari ro'yxatini (`vals_list`) qabul qiladigan qilib bezaydi. Bu bazaga bir nechta yozuvni bitta SQL bilan tezkor kiritish imkonini beradi.

```python
@api.model_create_multi
def create(self, vals_list):
    for vals in vals_list:
        vals['name'] = vals.get('name', '').upper()
    return super().create(vals_list)
```

---

### Q31. How to handle `One2many` commands syntax `(0, 0, values)`, `(1, id, values)`, `(6, 0, ids)` in `write()` and `create()`? | `write()` va `create()`-da `One2many` buyruqlari sintaksisi qanday ishlatiladi?

**EN:** Relational fields accept special tuple command triples: `(0, 0, vals)` creates child, `(1, id, vals)` updates child, `(2, id, 0)` deletes child, `(6, 0, ids)` replaces all links with new set of IDs.

**UZ:** Relatsion maydonlar `(0, 0, vals)` - yaratish, `(1, id, vals)` - yangilash, `(2, id, 0)` - o'chirish va `(6, 0, ids)` - to'liq yangi ro'yxat bilan almashtirish kabi maxsus buyruqlarni qabul qiladi.

```python
order.write({
    'line_ids': [
        (0, 0, {'product_id': 10, 'qty': 2}), # Create line
        (6, 0, [101, 102])                    # Replace with IDs 101, 102
    ]
})
```

---

### Q32. What are Record Rules (`ir.rule`) and how do they differ from `ir.model.access.csv`? | Record Rules (`ir.rule`) nima va ular `ir.model.access.csv`-dan qanday farq qiladi?

**EN:** `ir.model.access.csv` grants global table CRUD access permissions. `ir.rule` filters specific row records dynamically based on active user context (`user.id`, `company_ids`).

**UZ:** `ir.model.access.csv` butun model/jadval uchun umumiy CRUD ruxsatlarini beradi. `ir.rule` esa alohida satrlarni foydalanuvchi va kompaniya kontekstiga qarab dinamiqlashtirib saralaydi.

```xml
<record id="rule_personal_appointment" model="ir.rule">
    <field name="name">Personal Appointments Only</field>
    <field name="model_id" ref="model_hospital_appointment"/>
    <field name="domain_force">[('user_id', '=', user.id)]</field>
    <field name="perm_read" eval="True"/>
    <field name="perm_write" eval="True"/>
</record>
```

---

### Q33. How to create User Groups (`res.groups`) and security categories in XML? | XML-da foydalanuvchi guruhlari (`res.groups`) va xavfsizlik kategoriyalari qanday yaratiladi?

**EN:** Groups are created in XML under `res.groups` and organized visually using categories defined in `ir.module.category`.

**UZ:** Guruhlar XML faylda `res.groups` modeli ostida yaratiladi va `ir.module.category` orqali toifalarga ajratiladi.

```xml
<record id="module_category_hospital" model="ir.module.category">
    <field name="name">Hospital Management</field>
</record>

<record id="group_hospital_doctor" model="ir.ui.group">
    <field name="name">Doctor Group</field>
    <field name="category_id" ref="module_category_hospital"/>
</record>
```

---

### Q34. How to use `sudo()` safely and what are the security risks? | `sudo()`-dan qanday qilib xavfsiz foydalaniladi va uning xavfsizlik tavakkalchiliklari nimalardan iborat?

**EN:** `sudo()` elevates recordset environment permissions to Superuser (bypassing access rules). Risk: Unauthorized users may perform privileged operations if input parameters are not sanitized.

**UZ:** `sudo()` recordset muhitini admin (Superuser) darajasiga ko'taradi. Xavfi: foydalanuvchi kiritgan ma'lumotlar tekshirilmasa, ruxsatsiz amallar bajarilib ketishi mumkin.

```python
# Safe usage: read public/system configuration without granting user write access
def get_system_param(self):
    param = self.env['ir.config_parameter'].sudo().get_param('hospital.default_tax')
    return float(param or 0.0)
```

---

### Q35. How to use `with_context()` to pass dynamic context variables? | Dinamik kontekst o'zgaruvchilarini uzatish uchun `with_context()`-dan qanday foydalaniladi?

**EN:** `with_context(**kwargs)` returns a copy of the recordset attached to an updated immutable context dict.

**UZ:** `with_context(**kwargs)` mavjud kontekstga yangi kalit-qiymatlarni qo'shgan holda recordset nusxasini qaytaradi.

```python
# Pass custom context flag to control create behavior
partner = self.env['res.partner'].with_context(tracking_disable=True).create({
    'name': 'Silent Partner'
})
```

---

### Q36. How to query recordsets using domain filters in Python (`domain=[('state', '=', 'draft')]`)? | Python-da domen filterlari yordamida yozuvlar to'plamini qanday qidirish mumkin?

**EN:** Domains are lists of criteria tuples: `('field_name', 'operator', value)`. Default implicit logical operator between tuples is `AND`.

**UZ:** Domenlar `('field_name', 'operator', value)` ko'rinishidagi kortejlar ro'yxatidir. Sukut bo'yicha ular o'rtasida `AND` mantiqiy botiqligi mavjud.

```python
draft_orders = self.env['sale.order'].search([
    ('state', '=', 'draft'),
    ('amount_total', '>', 1000.0)
])
```

---

### Q37. How to implement complex logical dynamic domains with AND `&`, OR `|`, NOT `!` prefix operators? | Prefiks operatorlar (`&`, `|`, `!`) bilan murakkab mantiqiy dinamik domenlarni qanday amalga oshirish mumkin?

**EN:** Complex domains use Polish Prefix Notation where operators (`|`, `&`, `!`) precede their target criteria.

**UZ:** Murakkab domenlar Polsha prefiks belgilashidan foydalanadi: mantiqiy operatorlar (`|`, `&`, `!`) o'z shartlaridan oldin qo'yiladi.

```python
# Domain logic: (state == 'draft' OR state == 'sent') AND amount > 500
domain = [
    '&',
        '|', ('state', '=', 'draft'), ('state', '=', 'sent'),
        ('amount_total', '>', 500.0)
]
records = self.env['sale.order'].search(domain)
```

---

### Q38. How to create and configure a Kanban View in XML? | XML-da Kanban ko'rinishini qanday yaratish va sozlash mumkin?

**EN:** Kanban views present records as graphical cards using QWeb XML templating embedded inside `<kanban>` tags.

**UZ:** Kanban ko mezonli ko'rinishlar yozuvlarni vizual kartochkalar shaklida `<kanban>` tegining ichidagi QWeb shablonlari orqali ko'rsatadi.

```xml
<record id="view_patient_kanban" model="ir.ui.view">
    <field name="name">hospital.patient.kanban</field>
    <field name="model">hospital.patient</field>
    <field name="arch" type="xml">
        <kanban default_group_by="state">
            <field name="id"/>
            <field name="name"/>
            <templates>
                <t t-name="kanban-box">
                    <div class="oe_kanban_global_click">
                        <strong><field name="name"/></strong>
                    </div>
                </t>
            </templates>
        </kanban>
    </field>
</record>
```

---

### Q39. How to use `mapped()` and `filtered()` recordset methods for clean Pythonic code? | Toza Python kodi uchun `mapped()` va `filtered()` metodlaridan qanday foydalaniladi?

**EN:** `mapped()` extracts field values across recordsets (or navigates relations). `filtered()` filters recordsets using Python lambda predicates.

**UZ:** `mapped()` yozuvlar bo'ylab ma'lum bir maydon qiymatlarini yig'ib beradi. `filtered()` esa lamba funksiyasi orqali yozuvlarni saralaydi.

```python
partners = self.env['res.partner'].search([])
# Extract list of names
names = partners.mapped('name')
# Filter active companies
companies = partners.filtered(lambda p: p.is_company and p.active)
```

---

### Q40. How to use `sorted()` on recordsets with custom keys? | Yozuvlar to'plamida moslashtirilgan kalitlar bilan `sorted()`-dan qanday foydalaniladi?

**EN:** `sorted()` sorts an existing memory recordset by field name or lambda sorting key without querying PostgreSQL database again.

**UZ:** `sorted()` ma'lumotlar bazasiga so'rov yubormasdan xotiradagi recordset-ni belgilangan maydon yoki lambda bo'yicha saralaydi.

```python
patients = self.env['hospital.patient'].search([])
sorted_by_age = patients.sorted(key=lambda p: p.age, reverse=True)
```

---

### Q41. How to write custom search methods using `@api.model` and `_search()`? | `@api.model` va `_search()` yordamida maxsus qidiruv metodlarini qanday yozish mumkin?

**EN:** Overriding `_search()` allows modifying ORM domain evaluation low-level SQL query construction.

**UZ:** `_search()` metodini qayta aniqlash orqali ORM domenlarini qidirish SQL so'rov darajasida o'zgartirilishi mumkin.

```python
@api.model
def _search(self, domain, offset=0, limit=None, order=None, access_rights_uid=None):
    # Inject custom restriction to all search queries
    domain = [('active', '=', True)] + list(domain)
    return super()._search(domain, offset=offset, limit=limit, order=order, access_rights_uid=access_rights_uid)
```

---

### Q42. How do inverse function and search function work on computed fields (`compute`, `inverse`, `search`)? | Hisoblanadigan maydonlarda inverse va search funksiyalari qanday ishlaydi?

**EN:** `inverse` makes a computed field writable. `search` enables domain filtering on non-stored computed fields by returning dynamic domains.

**UZ:** `inverse` atributi compute maydonni tahrirlanadigan qiladi. `search` atributi esa saqlanmaydigan compute maydonlarda domen qidiruvini amalga oshirish imkonini beradi.

```python
upper_name = fields.Char(compute='_compute_upper', inverse='_inverse_upper', search='_search_upper')

def _compute_upper(self):
    for r in self: r.upper_name = (r.name or '').upper()

def _inverse_upper(self):
    for r in self: r.name = (r.upper_name or '').lower()

def _search_upper(self, operator, value):
    return [('name', operator, value.lower())]
```

---

### Q43. What is `read_group()` and how is it used for database aggregation? | `read_group()` nima va u ma'lumotlar bazasini agregatsiya qilish uchun qanday ishlatiladi?

**EN:** `read_group()` performs PostgreSQL `GROUP BY` aggregations returning summarized dictionaries without loading raw objects.

**UZ:** `read_group()` Postgres bazasida `GROUP BY` agregatsiyalarini bajarib, natijalarni lug'at ko'rinishida yig'ib beradi.

```python
res = self.env['sale.order'].read_group(
    domain=[('state', '=', 'sale')],
    fields=['partner_id', 'amount_total:sum'],
    groupby=['partner_id']
)
```

---

### Q44. What is `search_read()` and when should you use it over `search()`? | `search_read()` nima va qachon uni `search()` o'rniga ishlatish kerak?

**EN:** `search_read()` combines `search()` and `read()`, fetching specific field values directly as a list of raw Python dictionaries for maximum efficiency.

**UZ:** `search_read()` `search()` va `read()` metodlarini birlashtirib, belgilangan maydonlarni to'g'ridan-to'g'ri lug'atlar ro'yxati shaklida tezkor olib beradi.

```python
# High performance field reading
data = self.env['hospital.patient'].search_read(
    domain=[('age', '>', 18)],
    fields=['name', 'age'],
    limit=50
)
```

---

### Q45. How to override `name_get()` / `_compute_display_name()` to customize record display names? | Yozuvlarning ko'rinadigan nomlarini moslashtirish uchun `_compute_display_name()` qanday qayta aniqlanadi?

**EN:** In Odoo 17+, `_compute_display_name()` computes dynamic label strings shown in `Many2one` drop-down widgets.

**UZ:** Odoo 17+ versiyalarida `_compute_display_name()` `Many2one` ro'yxatlarida ko'rinadigan matn shaklini belgilaydi.

```python
def _compute_display_name(self):
    for rec in self:
        rec.display_name = f"[{rec.id}] {rec.name}"
```

---

### Q46. How to override `name_search()` to support custom field auto-completion searching? | Maydonlarni avtomatik to'ldirish qidiruvini qo'llab-quvvatlash uchun `name_search()` qanday qayta aniqlanadi?

**EN:** `name_search()` handles auto-complete search matching in UI relational fields, enabling search by secondary attributes (e.g. ISBN or Phone).

**UZ:** `name_search()` relational maydonlarda foydalanuvchi qidiruv kiritganda ikkilamchi atributlar (masalan: telefon yoki ISBN) bo'yicha qidirishni ta'minlaydi.

```python
@api.model
def _name_search(self, name, domain=None, operator='ilike', limit=100, order=None):
    domain = domain or []
    if name:
        domain = ['|', ('name', operator, name), ('isbn', operator, name)] + domain
    return self._search(domain, limit=limit, order=order)
```

---

### Q47. How to trigger dynamic wizard actions using `models.TransientModel`? | `models.TransientModel` yordamida dinamik wizard harakatlarini qanday ishga tushirish mumkin?

**EN:** Wizards are transient models that perform an action and return a dictionary window action to close or open a new view.

**UZ:** Wizardlar — vaqtinchalik modellar bo'lib, biror amalni bajaradi va oyna harakatini (action dictionary) qaytaradi.

```python
class PatientWizard(models.TransientModel):
    _name = 'patient.wizard'

    reason = fields.Text(string='Reason', required=True)

    def action_apply(self):
        # Perform logic
        return {'type': 'ir.actions.act_window_close'}
```

---

### Q48. How to send automated emails using Odoo Email Templates (`mail.template`)? | Odoo Email Shablonlari (`mail.template`) yordamida avtomatik elektron pochta xabarlarini qanday yuborish mumkin?

**EN:** Email templates define Jinja2/QWeb dynamic message bodies. Rendered and dispatched using `template.send_mail(res_id)`.

**UZ:** Email shablonlar xat mazmunini belgilaydi hamda `send_mail(res_id)` orqali avtomatik ravishda yuboriladi.

```python
def action_send_email(self):
    template = self.env.ref('custom_hospital.email_template_patient_welcome')
    for rec in self:
        template.send_mail(rec.id, force_send=True)
```

---

### Q49. How to track field changes using Chatter (`tracking=True`) and `mail.thread` mixin? | Chatter (`tracking=True`) va `mail.thread` mixin yordamida maydon o'zgarishlarini qanday kuzatish mumkin?

**EN:** Inheriting `mail.thread` and setting `tracking=True` on fields logs automatic change audit logs into the form view chatter box.

**UZ:** Modelga `mail.thread` mixinini qo'shish va maydonlarga `tracking=True` berish ularning o'zgarish tarixini chatter-da qayd etadi.

```python
class Patient(models.Model):
    _name = 'hospital.patient'
    _inherit = ['mail.thread']

    state = fields.Selection([('draft', 'Draft'), ('done', 'Done')], tracking=True)
```

---

### Q50. How to manage activity streams using `mail.activity.mixin`? | `mail.activity.mixin` yordamida faoliyat oqimlarini qanday boshqarish mumkin?

**EN:** `mail.activity.mixin` provides scheduling functionality for follow-up activities (calls, emails, meetings) attached to records.

**UZ:** `mail.activity.mixin` ob'ektlarga rejalashtirilgan vazifalarni (qo'ng'iroq, uchrashuv, xat) biriktirish imkonini beradi.

```python
class Patient(models.Model):
    _name = 'hospital.patient'
    _inherit = ['mail.thread', 'mail.activity.mixin']
```

---

### Q51. How to create dynamic buttons with Python `type="object"` vs XML `type="action"`? | Python `type="object"` va XML `type="action"` bilan dinamik tugmalarni qanday yaratish mumkin?

**EN:** `type="object"` executes a Python model method (`name="method_name"`). `type="action"` triggers an XML window action (`name="%(action_xml_id)d"`).

**UZ:** `type="object"` tugmasi Python model metodini bajaradi. `type="action"` esa XML action-ni ishga tushiradi.

```xml
<!-- Executes Python method -->
<button name="action_confirm" string="Confirm" type="object" class="btn-primary"/>

<!-- Triggers XML Window Action -->
<button name="%(action_patient_wizard)d" string="Open Wizard" type="action"/>
```

---

### Q52. How to handle translations (`_()` function) in Python and JavaScript? | Python va JavaScript-da tarjimalarni (`_()` funksiyasi) qanday boshqarish mumkin?

**EN:** Import `_` from `odoo` in Python or `@web/core/l10n/translation` in JS to mark user-facing string literals for PO file export.

**UZ:** Python-da `from odoo import _` orqali matnlarni `_("Text")` ko'rinishida o'rab tarjima fayllariga (PO) eksport qilinadi.

```python
from odoo import _
from odoo.exceptions import UserError

def validate(self):
    if not self.name:
        raise UserError(_("Patient name is required! / Bemor ismi kiritilishi shart!"))
```

---

### Q53. How to define SQL constraints (`_sql_constraints`) in Odoo models? | Odoo modellarida SQL cheklovlarini (`_sql_constraints`) qanday aniqlash mumkin?

**EN:** `_sql_constraints` defines database-level unique or check rules: `[('constraint_name', 'SQL_RULE', 'Error message')]`.

**UZ:** `_sql_constraints` ma'lumotlar bazasi darajasida takrorlanmaslik (UNIQUE) yoki qiymat sharti (CHECK) qoidalarini o'rnatadi.

```python
class Patient(models.Model):
    _name = 'hospital.patient'

    code = fields.Char(string='Code', required=True)

    _sql_constraints = [
        ('code_unique', 'UNIQUE(code)', 'Patient Code must be unique!')
    ]
```

---

### Q54. How to perform soft deletion vs hard deletion in Odoo (`active` field behavior)? | Odoo-da yumshoq o'chirish (soft delete) va qattiq o'chirish (hard delete) qanday bajariladi (`active` maydoni)?

**EN:** Adding a boolean `active = fields.Boolean(default=True)` enables soft deletion (archiving records instead of deleting rows from DB).

**UZ:** Modelga `active = fields.Boolean(default=True)` qo'shish yozuvlarni bazadan o'chirmasdan arxivlash (soft delete) imkonini beradi.

```python
class Patient(models.Model):
    _name = 'hospital.patient'

    active = fields.Boolean(string='Active', default=True)
```

---

### Q55. How to create dynamic smart buttons (`stat_button`) on form views? | Form ko'rinishlarida dinamik smart tugmalarni (`stat_button`) qanday yaratish mumkin?

**EN:** Smart buttons display counter statistics inside form view button boxes (`<div class="oe_button_box">`).

**UZ:** Smart tugmalar formaning yuqori qismida boshqa ob'ektlarga bog'liq sonli statistikalarni aks ettiradi.

```xml
<div class="oe_button_box" name="button_box">
    <button name="action_view_appointments" type="object" class="oe_stat_button" icon="fa-calendar">
        <field name="appointment_count" widget="statinfo" string="Appointments"/>
    </button>
</div>
```

---

## 🔴 Ilg'or daraja / Advanced Level (Q56 – Q80)

---

### Q56. How to design a custom PDF Report using QWeb engine and `ir.actions.report`? | QWeb dvigateli va `ir.actions.report` yordamida qanday qilib moslashtirilgan PDF hisobot yaratiladi?

**EN:** PDF reports require registering an `ir.actions.report` record pointing to a QWeb XML template ID.

**UZ:** PDF hisobot yaratish uchun QWeb shablon ID-siga ishora qiluvchi `ir.actions.report` yozuvi yaratiladi.

```xml
<record id="action_report_patient_card" model="ir.actions.report">
    <field name="name">Patient Card</field>
    <field name="model">hospital.patient</field>
    <field name="report_type">qweb-pdf</field>
    <field name="report_name">custom_hospital.report_patient_template</field>
    <field name="binding_model_id" ref="model_hospital_patient"/>
    <field name="binding_type">report</field>
</record>
```

---

### Q57. How to write a Custom Report Abstract Model parser (`report.module.report_name`) for complex dynamic report calculations? | Murakkab hisobot hisob-kitoblari uchun Abstract Model parserini qanday yozish kerak?

**EN:** Define an Abstract Model named `report.<module_name>.<template_id>` overriding `_get_report_values()` to pass calculated data to QWeb.

**UZ:** QWeb shabloniga murakkab tayyorlangan ma'lumotlarni uzatish uchun `report.<modul>.<shablon_id>` nomli Abstract Model yoziladi.

```python
class CustomPatientReportParser(models.AbstractModel):
    _name = 'report.custom_hospital.report_patient_template'

    @api.model
    def _get_report_values(self, docids, data=None):
        docs = self.env['hospital.patient'].browse(docids)
        return {
            'doc_ids': docids,
            'doc_model': 'hospital.patient',
            'docs': docs,
            'custom_summary': 'Calculated dynamic metric data',
        }
```

---

### Q58. How to construct HTTP controllers using `@http.route()` in Odoo? | Odoo-da `@http.route()` yordamida HTTP kontrollerlarini qanday qurish mumkin?

**EN:** HTTP controllers expose web routes. Decorator `@http.route()` accepts route path, authentication type (`user`, `public`, `none`), and route type (`http` or `json`).

**UZ:** HTTP kontrollerlar URL marshrutlarini ochadi. `@http.route()` dekoratori manzil, autentifikatsiya turi va javob turini belgilaydi.

```python
from odoo import http
from odoo.http import request

class WebPortal(http.Controller):

    @http.route('/hospital/doctors', type='http', auth='public', website=True)
    def list_doctors(self, **kw):
        doctors = request.env['hospital.doctor'].sudo().search([])
        return request.render('custom_hospital.doctors_page', {'doctors': doctors})
```

---

### Q59. How to implement a JSON REST API endpoint in Odoo controller? | Odoo kontrollerida JSON REST API endpointini qanday amalga oshirish mumkin?

**EN:** Set `type='json'`, `auth='user'`, `methods=['POST']` to process incoming JSON payload via `request.dispatcher`.

**UZ:** JSON REST API bog'lamasini yaratish uchun `type='json'` parametridan foydalaniladi va ma'lumotlar avtomatik JSON ko'rinishida olinadi.

```python
class PatientAPI(http.Controller):

    @http.route('/api/v1/create_patient', type='json', auth='user', methods=['POST'], csrf=False)
    def create_patient(self, name, age, **kwargs):
        patient = request.env['hospital.patient'].create({'name': name, 'age': age})
        return {'status': 201, 'patient_id': patient.id, 'name': patient.name}
```

---

### Q60. How to handle multi-company isolation using `company_id` and record rules? | `company_id` va record rules yordamida ko'p kompaniyali izolyatsiyani qanday boshqarish kerak?

**EN:** Define `company_id` field on model and apply a global `ir.rule` matching `[('company_id', 'in', company_ids)]`.

**UZ:** Modelga `company_id` maydonini qo'shib, global `ir.rule` orqali faqat foydalanuvchi biriktirilgan kompaniyalar ma'lumotlarini ko'rish cheklovi o'rnatiladi.

```python
company_id = fields.Many2one('res.company', string='Company', default=lambda self: self.env.company)
```

---

### Q61. How to handle currency conversion using `res.currency` in multi-currency transactions? | Ko'p valyutali tranzaksiyalarda `res.currency` yordamida valyuta konvertatsiyasini qanday amalga oshirish kerak?

**EN:** Use `currency_id._convert(amount, target_currency, company, date)` to convert values dynamically based on exchange rate tables.

**UZ:** Valyutani boshqa valyutaga joriy kurs bo'yicha o'girish uchun `_convert()` metodidan foydalaniladi.

```python
converted_amount = self.currency_id._convert(
    from_amount=100.0,
    to_currency=target_currency_id,
    company=self.env.company,
    date=fields.Date.today()
)
```

---

### Q62. How to create a Multi-step Wizard with TransientModels and dynamic views? | TransientModel va dinamik ko'rinishlar yordamida Ko'p bosqichli Wizard-ni qanday yaratish mumkin?

**EN:** Store step state (`state = fields.Selection([('step1', 'Step 1'), ('step2', 'Step 2')])`) and return action dictionary reopening wizard form view.

**UZ:** Bosqich holatini (`state`) saqlagan holda wizard formasini qayta ochuvchi oyna harakatini (action) qaytarish orqali bosqichma-bosqich wizard yaratiladi.

```python
class MultiStepWizard(models.TransientModel):
    _name = 'multi.step.wizard'

    state = fields.Selection([('step1', 'Step 1'), ('step2', 'Step 2')], default='step1')
    note = fields.Text(string='Note')

    def action_next(self):
        self.state = 'step2'
        return {
            'type': 'ir.actions.act_window',
            'res_model': self._name,
            'res_id': self.id,
            'view_mode': 'form',
            'target': 'new',
        }
```

---

### Q63. How to write Cron jobs (`ir.cron`) for scheduled background processing? | Rejalashtirilgan fon vazifalari uchun Cron topshiriqlarini (`ir.cron`) qanday yozish kerak?

**EN:** Cron jobs call a python model method periodically based on interval types (minutes, hours, days).

**UZ:** Cron topshiriqlari ma'lum vaqt oralig'ida (`ir.cron`) ko'rsatilgan model metodini avtomatik ishga tushirib turadi.

```xml
<record id="ir_cron_auto_archive_patients" model="ir.cron">
    <field name="name">Hospital: Auto Archive Inactive Patients</field>
    <field name="model_id" ref="model_hospital_patient"/>
    <field name="state">code</field>
    <field name="code">model._cron_auto_archive()</field>
    <field name="interval_number">1</field>
    <field name="interval_type">days</field>
    <field name="numbercall">-1</field>
</record>
```

---

### Q64. How to use raw SQL executing via `self.env.cr.execute()` safely? | `self.env.cr.execute()` orqali xom SQL so'rovlarini xavfsiz qanday ishga tushirish mumkin?

**EN:** Execute direct SQL for mass updates bypassing ORM overhead, passing parameterized tuples to prevent SQL injection vulnerabilities.

**UZ:** SQL Injection hujumlaridan saqlanish uchun so'rov parametrlari tayyor kortej shaklida `execute(query, params)` orqali beriladi.

```python
def mass_update_status(self, old_status, new_status):
    query = """UPDATE hospital_patient SET state = %s WHERE state = %s"""
    self.env.cr.execute(query, (new_status, old_status))
```

---

### Q65. How to avoid N+1 query performance problems when fetching related recordsets? | Bog'liq yozuvlar to'plamini olishda N+1 so'rov unumdorligi muammolaridan qanday qochish kerak?

**EN:** Avoid running nested SQL queries or accessing relational fields inside loops. Use batch ORM calls or `mapped()`.

**UZ:** Tsikl ichida relational maydonlarga murojaat qilishdan qoching. `mapped()` va ommaviy ORM so'rovlaridan foydalaning.

```python
# Bad (N+1 queries)
for appointment in appointments:
    print(appointment.patient_id.name)

# Good (Batch prefetch)
patient_names = appointments.mapped('patient_id.name')
```

---

### Q66. What is `prefetch_related` / `with_prefetch()` mechanism in Odoo ORM? | Odoo ORM-da `prefetch_related` / `with_prefetch()` mexanizmi nima?

**EN:** Odoo automatically prefetches field values for all records present in the same recordset context during access to minimize queries.

**UZ:** Odoo xotiradagi recordset ichida bitta yozuv maydoni o'qilganda, boshqa barcha yozuvlar maydonlarini ham bir so'rovda avtomatik yuklab oladi (prefetching).

```python
patients = self.env['hospital.patient'].search([])
# Odoo loads 'age' for ALL records in 'patients' on the first iteration
for patient in patients:
    a = patient.age
```

---

### Q67. How to optimize PostgreSQL performance for Odoo (indexing, config parameters)? | Odoo uchun PostgreSQL unumdorligini qanday optimallashtirish mumkin?

**EN:** Set DB indexes (`index=True`) on foreign keys and domain search fields. Tune Postgres `shared_buffers`, `work_mem`, and `effective_cache_size`.

**UZ:** Tez-tez qidiriladigan maydonlarga indekslar o'rnating (`index=True`). Postgres parametri `shared_buffers` ni operativ xotiraning 25% qismiga sozlang.

```python
class Patient(models.Model):
    _name = 'hospital.patient'

    medical_code = fields.Char(string='Medical Code', index=True)
```

---

### Q68. How to use Odoo Cache memory decorator `@tools.ormcache` for expensive computation results? | Qimmat hisoblash natijalari uchun Odoo Cache xotira dekoratori `@tools.ormcache` dan qanday foydalaniladi?

**EN:** `@tools.ormcache(*args)` caches method results in RAM memory keyed by the specified argument names.

**UZ:** `@tools.ormcache` og'ir hisob-kitob natijalarini ko'rsatilgan argumentlar bo'yicha operativ xotirada (RAM) keshlab beradi.

```python
from odoo import tools

@tools.ormcache('company_id')
def _get_company_setting_cached(self, company_id):
    # Executed once per company_id until cache invalidation
    return self.env['res.company'].browse(company_id).custom_setting_val
```

---

### Q69. How to configure multi-worker deployment with Gevent for WebSocket / long-polling? | WebSocket / long-polling uchun Gevent bilan ko'p workerli joylashtirishni qanday sozlash kerak?

**EN:** Deploy Odoo with `workers > 0` and route `/websocket` or `/longpolling` traffic to Gevent port `8072` via Nginx reverse proxy.

**UZ:** Serverda `workers > 0` sozlangan holda, real-vaqt xabarnomalari uchun `/websocket` havolasini Gevent-ning 8072 portiga Nginx orqali yo'naltiring.

```nginx
# Nginx WebSocket proxy configuration
location /websocket {
    proxy_pass http://127.0.0.1:8072;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

---

### Q70. How to extend core models using dynamic `_inherit` without breaking third-party modules? | Uchinchi tomon modullarini buzmasdan dinamik `_inherit` yordamida asosiy modellarni qanday kengaytirish kerak?

**EN:** Always call `super()` inside overridden methods and preserve positional/keyword argument structures (`*args, **kwargs`).

**UZ:** Qayta aniqlangan metodlar ichida har doim `super()` ni chaqiring va barcha asl argumentlarni (`*args, **kwargs`) uzating.

```python
def write(self, vals):
    # Custom pre-processing
    res = super(ResPartner, self).write(vals)
    # Custom post-processing
    return res
```

---

### Q71. How to implement custom action windows returning dynamic web client actions (e.g. `ir.actions.act_url`, `ir.actions.client`)? | Dinamik veb-klient harakatlarini qaytaruvchi maxsus action oynalarini qanday amalga oshirish mumkin?

**EN:** Return dictionary with target action type to instruct the Odoo JS web client to redirect or render custom client components.

**UZ:** Veb-klientga brauzer sahifasini qayta yo'naltirish yoki maxsus mijoz komponentini render qilish uchun action lug'ati qaytariladi.

```python
def action_open_external_url(self):
    return {
        'type': 'ir.actions.act_url',
        'url': 'https://odoo.com',
        'target': 'new',
    }
```

---

### Q72. How to upload, store, and serve binary attachments (`fields.Binary`, `ir.attachment`) efficiently? | Binar birikmalarni (`fields.Binary`, `ir.attachment`) qanday samarli yuklash, saqlash va taqdim etish mumkin?

**EN:** Use `attachment=True` on `fields.Binary` to store raw bytes inside external file storage (`filestore`) instead of database BLOB columns.

**UZ:** Fayllarni ma mezonli ma'lumotlar bazasida emas, balki diskdagi fayllar omborida (filestore) saqlash uchun `attachment=True` parametrini bering.

```python
pdf_file = fields.Binary(string='PDF Document', attachment=True)
filename = fields.Char(string='Filename')
```

---

### Q73. How to override `default_get()` to set dynamic initial values when opening forms? | Formalarni ochishda dinamik boshlang'ich qiymatlarni o'rnatish uchun `default_get()` qanday qayta aniqlanadi?

**EN:** Overriding `default_get(fields_list)` computes dynamic default values populated into form view fields upon creation initialization.

**UZ:** `default_get()` metodini qayta yozish orqali yangi forma ochilganda maydonlarga dinamik boshlang'ich qiymatlar beriladi.

```python
@api.model
def default_get(self, fields_list):
    res = super().default_get(fields_list)
    if 'note' in fields_list:
        res['note'] = f"Created by user {self.env.user.name}"
    return res
```

---

### Q74. How to handle concurrency locking in Odoo using `SELECT FOR UPDATE` (`with_delay` or `cr.execute`)? | Odoo-da `SELECT FOR UPDATE` yordamida bir vaqtdagi kirish (concurrency) qulflanishini qanday boshqarish kerak?

**EN:** Prevent race conditions when updating sequence numbers or balances by acquiring PostgreSQL row locks using `FOR UPDATE`.

**UZ:** Ketma-ketlik raqamlari yoki balanslarni bir vaqtda o'zgartirishda poyga holati (race condition) oldini olish uchun `FOR UPDATE` qulfi ishlatiladi.

```python
def process_balance(self):
    self.env.cr.execute("SELECT balance FROM hospital_patient WHERE id = %s FOR UPDATE", (self.id,))
    # Safely perform read and update logic
```

---

### Q75. How to customize Odoo search bar auto-complete filters and search panel (`<searchpanel>`)? | Odoo qidiruv paneli va auto-complete filterlarini (`<searchpanel>`) qanday moslashtirish mumkin?

**EN:** Add `<searchpanel>` to search view XML to render a persistent side filter navigation tree based on Selection or `Many2one` fields.

**UZ:** Search view ichiga `<searchpanel>` tegini joylashtirish orqali chap tomonda toifalar bo'yicha doimiy saralash panelini hosil qilish mumkin.

```xml
<searchpanel>
    <field name="state" icon="fa-filter" enable_counters="1"/>
    <field name="doctor_id" icon="fa-user-md" limit="100"/>
</searchpanel>
```

---

### Q76. How to create dynamic assets bundles in manifest (`assets` dictionary)? | Manifestda dinamik assets bog'lamalarini (`assets` lug'ati) qanday yaratish kerak?

**EN:** Define custom JS/SCSS files under key `web.assets_backend` in `__manifest__.py` to inject scripts into the backend web client framework.

**UZ:** Custom JS va CSS/SCSS fayllarni Odoo web interfeysiga yuklash uchun `__manifest__.py` faylidagi `assets` lug'atiga yo'l beriladi.

```python
'assets': {
    'web.assets_backend': [
        'custom_hospital/static/src/scss/custom.scss',
        'custom_hospital/static/src/js/custom_widget.js',
    ],
}
```

---

### Q77. How to write server actions (`ir.actions.server`) executing Python code dynamically from UI? | UI-dan Python kodini dinamik ravishda ishga tushiradigan server harakatlarini (`ir.actions.server`) qanday yozish kerak?

**EN:** Server actions execute Python code snippets directly from UI action menus on selected recordsets (`records` / `record`).

**UZ:** Server harakatlari tanlangan yozuvlar ustida UI interfeysidan turib to'g'ridan-to'g mezonli Python kodini ishga tushirish imkonini berida.

```xml
<record id="action_mark_done_server" model="ir.actions.server">
    <field name="name">Mark Selected as Done</field>
    <field name="model_id" ref="model_hospital_patient"/>
    <field name="binding_model_id" ref="model_hospital_patient"/>
    <field name="state">code</field>
    <field name="code">
        records.write({'state': 'done'})
    </field>
</record>
```

---

### Q78. How to build custom Dashboard views combining Graph (`<graph>`) and Pivot (`<pivot>`) views? | Graph (`<graph>`) va Pivot (`<pivot>`) ko'rinishlarini birlashtirgan maxsus Dashboard ko'rinishlarini qanday qurish mumkin?

**EN:** Graph and Pivot views compute multi-dimensional analytical views using aggregated numeric measures and string dimensions.

**UZ:** Graph va Pivot ko'rinishlari analitik ko'rsatkichlarni ko'p o'lchamli diagrammalar va agregat jadvallar ko'rinishida chiqarib beradi.

```xml
<record id="view_appointment_graph" model="ir.ui.view">
    <field name="name">hospital.appointment.graph</field>
    <field name="model">hospital.appointment</field>
    <field name="arch" type="xml">
        <graph string="Appointments Analysis" type="bar">
            <field name="doctor_id" type="row"/>
            <field name="fee" type="measure"/>
        </graph>
    </field>
</record>
```

---

### Q79. How to utilize `env.flush_all()` and `env.invalidate_all()` for cache consistency? | Kesh mosligini ta'minlash uchun `env.flush_all()` va `env.invalidate_all()`-dan qanday foydalaniladi?

**EN:** `flush_all()` pushes all pending memory field updates down to PostgreSQL. `invalidate_all()` clears the ORM in-memory cache to force fresh DB reads.

**UZ:** `flush_all()` xotirada kutilayotgan barcha o'zgarishlarni bazaga yozadi. `invalidate_all()` esa keshni tozalab, keyingi safar ma'lumotlarni bazadan yangidan o'qishni majburlaydi.

```python
# Flush memory to DB before executing direct raw SQL query
self.env.flush_all()
self.env.cr.execute("SELECT sum(fee) FROM hospital_appointment")
# Invalidate ORM cache after direct SQL execution
self.env.invalidate_all()
```

---

### Q80. How to implement custom import/export data hooks and validator methods? | Ma'lumotlarni import/eksport qilish uchun maxsus ilgaklar (hooks) va validator metodlarini qanday amalga oshirish mumkin?

**EN:** Override `load()` or custom CSV import parsing methods to perform data sanitization before DB bulk insertion.

**UZ:** Ma'lumotlarni ommaviy yuklashda ularni tekshirish va tozalash uchun `load()` metodini qayta yozish mumkin.

```python
@api.model
def load(self, fields, data):
    # Sanitize input data before import processing
    cleaned_data = [[cell.strip() if isinstance(cell, str) else cell for cell in row] for row in data]
    return super().load(fields, cleaned_data)
```

---

## ⚫ Ekspert daraja / Expert Level (Q81 – Q100)

---

### Q81. How to write a custom OWL (Odoo Web Library) JS Component in Odoo 16/17+? | Odoo 16/17+ versiyalarida maxsus OWL JS Komponentini qanday yozish kerak?

**EN:** Inherit from `Component` provided by `@odoo/owl`, define an XML template using `xml` tag, and register it in `registry.category("actions")`.

**UZ:** `@odoo/owl` kutubxonasidan `Component`-ni meros olib, `xml` shabloni va registr orqali OWL reaktiv komponenti yaratiladi.

```javascript
import { Component, xml, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class PatientDashboard extends Component {
    static template = xml`
        <div class="p-4 bg-white shadow rounded">
            <h2>Patient Counter</h2>
            <button class="btn btn-primary" t-on-click="increment">
                Count: <t t-esc="state.count"/>
            </button>
        </div>
    `;
    setup() {
        this.state = useState({ count: 0 });
    }
    increment() {
        this.state.count++;
    }
}

registry.category("actions").add("patient_dashboard_tag", PatientDashboard);
```

---

### Q82. How to patch existing OWL JS components using `patch()` from `@web/core/utils/patch`? | `@web/core/utils/patch` modulidagi `patch()` yordamida mavjud OWL JS komponentlarini qanday tuzatish (patch) mumkin?

**EN:** `patch()` overrides or extends component prototype methods seamlessly without modifying third-party core JavaScript files.

**UZ:** `patch()` Odoo-dagi tayyor JS komponentlarining ichki metodlarini o'zgartirmasdan turib ularni kengaytirish va tuzatish imkonini berida.

```javascript
import { patch } from "@web/core/utils/patch";
import { WebClient } from "@web/webclient/webclient";

patch(WebClient.prototype, {
    setup() {
        super.setup();
        console.log("Custom WebClient Patched & Initialized!");
    }
});
```

---

### Q83. How to create a custom Field Widget in OWL JS and register it in `fieldsRegistry`? | OWL JS-da maxsus Field Widget yaratish va uni `fieldsRegistry`-da qanday ro'yxatdan o'tkazish kerak?

**EN:** Build an OWL component implementing the field interface and add it to `fields` category registry to make it usable in XML views (`widget="custom_widget"`).

**UZ:** Formadagi maydonlar uchun maxsus vidjet yaratib, uni `fields` registriga qo'shish orqali XML ko'rinishida `widget="custom_widget"` deb ishlatish mumkin.

```javascript
import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class ColorPickerField extends Component {
    static template = xml`<input type="color" t-att-value="props.value" t-on-change="onChange"/>`;
    static props = { ...standardFieldProps };

    onChange(ev) {
        this.props.update(ev.target.value);
    }
}

registry.category("fields").add("color_picker", { component: ColorPickerField });
```

---

### Q84. How to communicate between Python controllers and external applications via XML-RPC client SDK in Python? | Python-dagi XML-RPC client SDK orqali Python kontrollerlari va tashqi ilovalar o'rtasida qanday muloqot o'rnatiladi?

**EN:** External systems authenticate via `xmlrpc/2/common` and invoke ORM methods using `xmlrpc/2/object` endpoint.

**UZ:** Tashqi dasturlar XML-RPC protokoli orqali Odoo-da autentifikatsiyadan o'tib, barcha ORM metodlarini chaqirishi mumkin.

```python
import xmlrpc.client

url = 'http://localhost:8069'
db = 'odoo_db'
username = 'admin'
password = 'admin_password'

# 1. Authenticate
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
uid = common.authenticate(db, username, password, {})

# 2. Execute ORM Method externally
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')
patient_ids = models.execute_kw(db, uid, password, 'hospital.patient', 'search', [[['age', '>', 18]]])
```

---

### Q85. How to perform custom JSON-RPC authentication and call model methods externally? | JSON-RPC orqali moslashtirilgan autentifikatsiya va model metodlarini tashqaridan chaqirish qanday bajariladi?

**EN:** External systems post JSON payloads to `/jsonrpc` or `/web/session/authenticate` endpoint to obtain session cookies and invoke model methods.

**UZ:** JSON-RPC yordamida tashqi tizimlar `/web/session/authenticate` ga POST so'rov yuborib seans hosil qiladi va metodlarni chaqiradi.

```python
import requests

url = "http://localhost:8069/web/session/authenticate"
payload = {
    "jsonrpc": "2.0",
    "params": {
        "db": "odoo_db",
        "login": "admin",
        "password": "admin_password"
    }
}
response = requests.post(url, json=payload)
cookies = response.cookies # Retain session cookies for subsequent calls
```

---

### Q86. How to handle Odoo database schema migrations across major versions using OpenUpgrade / migration scripts (`migrations/` directory)? | `migrations/` papkasi va OpenUpgrade yordamida ma'lumotlar bazasi sxemalarini versiyalararo ko'chirish qanday boshqariladi?

**EN:** Create Python migration scripts inside `migrations/<version>/pre-migrate.py` or `post-migrate.py` executing SQL statements before/after module upgrade.

**UZ:** Versiyalar almasganda ma'lumotlar bazasi ustunlarini moslashtirish uchun `migrations/<version>/pre-migrate.py` faylida SQL ko'chirish kodi yoziladi.

```python
# migrations/17.0.1.1/pre-migrate.py
def migrate(cr, version):
    # Rename old column safely before ORM initializes
    cr.execute("ALTER TABLE hospital_patient RENAME COLUMN old_name TO name;")
```

---

### Q87. How to configure high-availability Odoo deployment behind Nginx load balancer with SSL termination? | SSL terminatsiyasi va Nginx load balancer ortida yuqori tayyorlikdagi (HA) Odoo tizimini qanday sozlash kerak?

**EN:** Configure Nginx with `upstream` cluster blocks balancing traffic across multiple Odoo server backend nodes using sticky sessions (`ip_hash`).

**UZ:** Bir nechta Odoo server klasterlari o'rtasida yuklamani taqsimlash uchun Nginx-da `upstream` va `ip_hash` (sessiyalar saqlanishi uchun) ishlatiladi.

```nginx
upstream odoo_cluster {
    ip_hash;
    server 10.0.0.1:8069;
    server 10.0.0.2:8069;
}

server {
    listen 443 ssl;
    server_name erp.example.com;

    ssl_certificate /etc/ssl/certs/odoo.crt;
    ssl_certificate_key /etc/ssl/certs/odoo.key;

    location / {
        proxy_pass http://odoo_cluster;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

---

### Q88. How to build a custom RESTful API authentication middleware using JWT (JSON Web Tokens) in Odoo controller? | Odoo kontrollerida JWT yordamida moslashtirilgan RESTful API autentifikatsiya middleware-ini qanday qurish mumkin?

**EN:** Intercept requests in a custom HTTP controller decorator or route handler, decode JWT headers using `pyjwt`, and set `request.env`.

**UZ:** Veb-kontroller marshrutida `pyjwt` orqali Header-dagi token to'g'riligini tekshirish va autentifikatsiya berish middleware-i yaratiladi.

```python
import jwt
from functools import wraps
from odoo.http import request, Response

SECRET_KEY = "SUPER_SECRET_JWT_KEY"

def require_jwt(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.htheaders.get('Authorization')
        if not token:
            return Response("Token missing", status=401)
        try:
            payload = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
            request.uid = payload['user_id']
        except Exception:
            return Response("Invalid token", status=403)
        return f(*args, **kwargs)
    return decorated
```

---

### Q89. How to design multi-tenant row-level security using complex dynamic Record Rules with domain expressions? | Domen ifodalari bilan murakkab dinamik Record Rules yordamida multi-tenant satr darajasidagi xavfsizlikni qanday loyihalash kerak?

**EN:** Construct dynamic domains comparing user attribute sets (`user.groups_id`, `user.partner_id`) against record attributes.

**UZ:** Dynamic domain orqali foydalanuvchi biriktirilgan sub-tashkilot va bo'lim ma'lumotlarinigina ko'rishini ta'minlovchi Record Rule yaratiladi.

```xml
<record id="rule_multi_tenant_branch" model="ir.rule">
    <field name="name">Branch Isolation Security Rule</field>
    <field name="model_id" ref="model_hospital_patient"/>
    <field name="domain_force">
        ['|', ('branch_id', '=', False), ('branch_id', 'in', user.branch_ids.ids)]
    </field>
</record>
```

---

### Q90. How to write materialized views (`models.Model` with `_auto = False`) backed by complex SQL JOIN queries? | Murakkab SQL JOIN so'rovlariga asoslangan materiallashtirilgan ko'rinishlarni (`_auto = False`) qanday yozish kerak?

**EN:** Set `_auto = False` on a model and override `init()` to create a PostgreSQL Database View (`CREATE OR REPLACE VIEW`).

**UZ:** Modelda `_auto = False` qilib, `init()` metodida SQL `CREATE VIEW` So'rovi orqali analitik bazaviy hisobot jadvallari quriladi.

```python
class PatientAnalysisReport(models.Model):
    _name = 'patient.analysis.report'
    _description = 'Patient Analysis View'
    _auto = False

    patient_name = fields.Char(readonly=True)
    total_fee = fields.Float(readonly=True)

    def init(self):
        tools.drop_view_if_exists(self.env.cr, self._table)
        self.env.cr.execute(f"""
            CREATE OR REPLACE VIEW {self._table} AS (
                SELECT
                    p.id AS id,
                    p.name AS patient_name,
                    SUM(a.fee) AS total_fee
                FROM hospital_patient p
                LEFT JOIN hospital_appointment a ON a.patient_id = p.id
                GROUP BY p.id, p.name
            )
        """)
```

---

### Q91. How to handle asynchronous background processing using Odoo Queue Job (`queue.job` framework)? | Odoo Queue Job freymvorki yordamida asinxron fon ishlovini qanday boshqarish kerak?

**EN:** Annotate expensive heavy tasks with `@job` decorator to delegate processing to external background worker workers asynchronously.

**UZ:** Og'ir amallarni (masalan: ommaviy fayl generatsiyasi) fon rejimida asinxron bajarish uchun `@job` dekoratoridan foydalaniladi.

```python
# Requires connector / queue_job community module installed
from odoo.addons.queue_job.job import job

class Patient(models.Model):
    _name = 'hospital.patient'

    @job
    def generate_heavy_medical_report_async(self):
        # Long running PDF generation or sync process executed in background
        pass
```

---

### Q92. How to build custom client actions (`@web/core/user_actions`) rendered via OWL framework? | OWL freymvorki orqali render qilinadigan maxsus mijoz harakatlarini (`client actions`) qanday qurish mumkin?

**EN:** Register an OWL component in action registry and trigger it using Python returning `{'type': 'ir.actions.client', 'tag': 'custom_tag'}`.

**UZ:** OWL komponentini client action ro'yxatdan o'tkazib, Python action orqali uni butun ekranga ochish.

```python
def open_custom_dashboard(self):
    return {
        'type': 'ir.actions.client',
        'tag': 'patient_dashboard_tag',
        'params': {'initial_filter': 'active'}
    }
```

---

### Q93. How to optimize large-scale data imports (100k+ rows) using memory chunking and raw SQL insertion? | Katta hajmli ma'lumotlar importini (100k+ satr) xotirani bo'lish va xom SQL kiritish orqali qanday optimallashtirish mumkin?

**EN:** Chunk large CSV datasets into batch sizes of 5,000 rows and execute `psycopg2.extras.execute_values()` for raw SQL insertion.

**UZ:** Katta hajmli ma'lumotlar faylini (100k+ satr) 5000 talik bo'laklarga (chunks) bo'lib, `execute_values()` orqali bazaga to'g'ridan-to'g'ri kiritiladi.

```python
from psycopg2.extras import execute_values

def bulk_insert_patients(self, patient_data_list):
    query = "INSERT INTO hospital_patient (name, age, active) VALUES %s"
    # Chunking tuples
    tuples = [(p['name'], p['age'], True) for p in patient_data_list]
    execute_values(self.env.cr, query, tuples, page_size=5000)
```

---

### Q94. How to debug Odoo server code using `pdb` / `breakpoint()` and Odoo CLI options (`--dev=all`)? | Odoo server kodini `pdb` / `breakpoint()` va Odoo CLI parametrlari (`--dev=all`) yordamida qanday nosozliklarni bartaraf etish (debug) mumkin?

**EN:** Insert `breakpoint()` inside Python methods and launch server with `./odoo-bin --dev=all` to enable instant code reloading and interactive debugging terminal.

**UZ:** Python kodiga `breakpoint()` joylashtiring va serverni `--dev=all` bayrog'i bilan ishga tushiring. Bu avto-reload va nozlilqlarni interaktiv terminalda tuzatish imkonini berida.

```python
def action_complex_calc(self):
    # Triggers interactive PDB shell in terminal upon execution
    breakpoint()
    res = self.age * 2.5
    return res
```

---

### Q95. How to write Unit Tests (`TransactionCase`, `SingleTransactionCase`, `HttpCase`) in Odoo? | Odoo-da Unit Testlarni (`TransactionCase`, `HttpCase`) qanday yozish kerak?

**EN:** Inherit from `odoo.tests.common.TransactionCase` to run automated rollback unit tests validating business model rules.

**UZ:** `TransactionCase` sinfidan meros olib, har bir test bajarilgandan so'ng ma'lumotlar bazasini avtomatik orqaga qaytaruvchi (rollback) unit testlar yoziladi.

```python
from odoo.tests.common import TransactionCase

class TestHospitalPatient(TransactionCase):

    def setUp(self):
        super().setUp()
        self.patient = self.env['hospital.patient'].create({
            'name': 'John Doe',
            'age': 30
        })

    def test_patient_creation(self):
        self.assertEqual(self.patient.name, 'John Doe')
        self.assertTrue(self.patient.active)
```

---

### Q96. How to mock external web services in Odoo unit tests using `@patch` and `unittest.mock`? | Odoo unit testlarida `@patch` va `unittest.mock` yordamida tashqi veb-xizmatlarni qanday simulyatsiya qilish (mocking) mumkin?

**EN:** Use `unittest.mock.patch` to intercept HTTP requests made by third-party SDKs during unit test suites.

**UZ:** Unit testlarni o'tkazishda tashqi tarmoq so'rovlarini ushlab qolish va sinov ma'lumotlarini qaytarish uchun `patch` ishlatiladi.

```python
from unittest.mock import patch
from odoo.tests.common import TransactionCase

class TestExternalAPI(TransactionCase):

    @patch('requests.get')
    def test_api_call(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {'status': 'ok'}
        
        res = self.env['hospital.patient'].fetch_remote_data()
        self.assertEqual(res['status'], 'ok')
```

---

### Q97. How to manage real-time WebSocket notifications using `bus.bus` model and JavaScript web client notification service? | `bus.bus` modeli va JS bildirishnoma xizmati yordamida real-vaqtdagi WebSocket bildirishnomalarini qanday boshqarish kerak?

**EN:** Send real-time bus notifications using `self.env['bus.bus']._sendone(target_partner, 'NOTIFICATION_TYPE', payload)`.

**UZ:** Serverdan mijoz brauzeriga darhol xabarnoma yuborish uchun `bus.bus` modelining `_sendone()` metodidan foydalaniladi.

```python
def notify_user(self):
    self.env['bus.bus']._sendone(
        self.env.user.partner_id,
        'simple_notification',
        {
            'type': 'danger',
            'title': 'Alert / Ogohlantirish',
            'message': 'Appointment cancelled!',
            'sticky': False,
        }
    )
```

---

### Q98. How to customize Odoo Web Client Navbar, ControlPanel, and Sidebar using OWL templates? | OWL shablonlari yordamida Odoo Veb Klient Navbarni, ControlPanel va Yon panelni qanday moslashtirish mumkin?

**EN:** Override OWL templates by inheriting `<t t-inherit="web.ControlPanel" t-inherit-mode="extension">` inside module assets.

**UZ:** `web.ControlPanel` shablonini XML-da `t-inherit-mode="extension"` orqali meros olib, Odoo boshqaruv panelini moslashtirish mumkin.

```xml
<templates xml:space="preserve">
    <t t-inherit="web.ControlPanel" t-inherit-mode="extension">
        <xpath expr="//div[hasclass('o_cp_buttons')]" position="inside">
            <button class="btn btn-secondary">Custom Quick Action</button>
        </xpath>
    </t>
</templates>
```

---

### Q99. How to implement database connection pooling and PGBouncer configuration for massive concurrent user scaling? | Katta hajmli bir vaqtdagi foydalanuvchilar masshtablanishi uchun DB connection pooling va PgBouncer-ni qanday sozlash kerak?

**EN:** Deploy PgBouncer in `transaction` pooling mode in front of PostgreSQL to reuse open DB connections across thousands of concurrent web threads.

**UZ:** Minglab bir vaqtdagi foydalanuvchi so'rovlarini masshtablash uchun PostgreSQL oldiga `transaction` rejimida PgBouncer joylashtiriladi.

```ini
; pgbouncer.ini
[databases]
odoo_db = host=127.0.0.1 port=5432 dbname=odoo_db

[pgbouncer]
listen_port = 6432
listen_addr = *
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 5000
default_pool_size = 50
```

---

### Q100. How to design a full end-to-end custom Odoo module lifecycle architecture from spec to deployment? | Spesifikatsiyadan joylashtirishgacha bo'lgan to'liq Odoo modulining hayotiy sikli arxitekturasi qanday loyihalashtiriladi?

**EN:** 
1. **Requirements & Data Modeling:** Define business models, relations, field constraints, security matrices.
2. **Architecture Layout:** Standard module structure (`models/`, `views/`, `security/`, `reports/`, `controllers/`, `static/`).
3. **Security First:** Declare group categories, `ir.model.access.csv` rules, and dynamic `ir.rule` record rules.
4. **UI/UX Design:** Build XML Forms, List views, Kanban views, Search panels, and OWL components.
5. **Business Logic & APIs:** Implement `@api.depends`, `@api.constrains`, HTTP JSON-RPC controllers, and external integrations.
6. **Automated Testing:** Write `TransactionCase` & `HttpCase` test coverage.
7. **CI/CD & Deployment:** Configure GitHub Actions for linting/testing and deploy using multi-worker Odoo behind Nginx with PgBouncer.

**UZ:**
1. **Talablar va Modellashtirish:** Biznes modellar, munosabatlar, xavfsizlik matrisasini belgilash.
2. **Arxitektura tuzilishi:** Standart modul strukturasini tayyorlash (`models/`, `views/`, `security/` va boshqalar).
3. **Xavfsizlik:** Guruhlar, `ir.model.access.csv` va dinamik `ir.rule` qoidalarini aniqlash.
4. **UI/UX Ko'rinishlar:** XML Form, Tree, Kanban, Search panel va OWL JS vidjetlarini qurish.
5. **Biznes mantiq va API:** `@api.depends`, HTTP JSON-RPC kontrollerlari va integratsiyalarni yozish.
6. **Avtomatlashtirilgan Testlar:** `TransactionCase` testlarini yaratish.
7. **CI/CD va Joylashtirish:** Nginx va PgBouncer ortida multi-worker Odoo-ni tarqatish va avtomatik testlashni sozlash.

```python
# Complete Module Architecture Validation Checklist
def validate_module_architecture():
    manifest_valid = True
    security_rules_valid = True
    unit_tests_passing = True
    return manifest_valid and security_rules_valid and unit_tests_passing
```


---

# 🎨 PART 3: ODOO UI & FUNCTIONAL USER GUIDE (100 UI & Functional Questions & Answers)
### Ikki tilli foydalanuvchi va UI bo'limi / Bilingual Functional & UI Reference Guide

> **Mavzular / Topics:**  
> - 🟢 **UI Navigation & Search Views** (Filters, Group By, Favorites)  
> - 🟡 **UI View Customization** (Form, Tree, Kanban, Pivot, Graph, Calendar, Gantt, Activity)  
> - 🔴 **Odoo Studio & No-Code Customizations**  
> - ⚫ **Functional Workflows** (Sales, Purchase, Inventory, Accounting, HR, MRP, PoS, Admin Settings)

---

## 🟢 UI NAVIGATION & SEARCH VIEWS (UI Q1 – UI Q25)

---

### UI Q1. Odoo Web Interfeysida Qidiruv (Search), Filtr (Filter) va Guruhlash (Group By) paneli qanday ishlaydi? / How does Search, Filter, and Group By work in Odoo UI?

**EN:** The Search bar at the top of Odoo views allows users to filter records using default or custom filters, group data dynamically by any field, and save custom search combinations as Favorites for quick future access.

**UZB:** Odoo yuqori qismidagi Qidiruv paneli ma'lumotlarni filtrlar orqali saralash, istalgan ustun bo'yicha dinamik guruhlash va tezkor kirish uchun "Saralanganlar (Favorites)" sifatida saqlash imkonini beradi.

```text
UI Path: Any App (e.g. Sales) -> Top Search Bar -> Filters / Group By / Favorites
```

---

### UI Q2. Custom Filter va Favorites panelini saqlash hamda boshqa foydalanuvchilar bilan ulashish (Share with all users) qanday bajariladi?

**EN:** In the search bar, click `Filters -> Add Custom Filter`, set conditions, then click `Favorites -> Save current search`. Check **Share with all users** to make it available globally across the company.

**UZB:** Search bar -> `Filters -> Add Custom Filter` tugmasini bosib shart kiritiladi. Keyin `Favorites -> Save current search` bosiladi va **Share with all users** bayrog'i yoqilsa, bu filtr barcha xodimlar uchun ochiq bo'ladi.

---

### UI Q3. Form View, Tree (List) View, Kanban View va Pivot View o'rtasidagi asosiy farqlar nimada?

| View Turi / View Type | Ishlash Maqsadi / Purpose | Asosiy Xususiyati / Key Feature |
|---|---|---|
| **Form View** | Bitta yozuvni to'liq ko'rish va tahrirlash | Tablar, tugmalar va status-bar saqlaydi |
| **Tree / List View** | Satrlar ko'rinishidagi jadval ro'yxati | Ommaviy tahrirlash (Inline Edit) va saralash |
| **Kanban View** | Bosqichma-bosqich kartochkalar (Drag & Drop) | CRM va Tasklar uchun visual taxta |
| **Pivot View** | Ko'p o'lchamli analitik hisobotlar (OLAP) | Excel kabi yig'ma jadvallar |

---

### UI Q4. Odoo UI da Action Buttons (Header buttons) va Statusbar qanday ishlaydi?

**EN:** Header buttons execute Python methods (e.g., `Confirm Sale`, `Send by Email`, `Cancel`). The `statusbar` widget visually tracks the lifecycle state of a record (e.g., `Draft -> Sent -> Sale Order`).

**UZB:** Yuqori tugmalar biznes mantiqni bajaradi (masalan, `Tasdiqlash`, `Email yuborish`). `statusbar` vidjeti hujjat holatini ko'zga ko'rinadigan qilib ko'rsatadi.

---

### UI Q5. Odoo UI dagi Chatter bo'limi (Followers, Send Message, Log Note, Schedule Activity) vazifalari nimadan iborat?

**EN:** Located on the right or bottom of Form views, Chatter handles internal collaboration:
- **Send Message:** Sends emails directly to customers/followers.
- **Log Note:** Internal discussion visible only to company employees.
- **Schedule Activity:** Assigns tasks (To Do, Call, Email, Meeting) with due dates.
- **Followers:** Users subscribed to automated record updates.

**UZB:** Form view o'ng/pastki qismidagi Chatter muloqotni boshqaradi: xaridorga email yuborish, ichki eslatma yozish, vazifa biriktirish va obunachilarni boshqarish.

---

### UI Q6. Developer Mode (Dasturchi rejimi) ni UI orqali qanday yoqish mumkin?

**EN:** Go to `Settings -> Developer Tools -> Activate the developer mode` (or append `?debug=1` to the URL).

**UZB:** `Sozlamalar (Settings) -> Developer Tools -> Activate the developer mode` tugmasi bosiladi (yoki URL oxiriga `?debug=1` qo'shiladi).

---

### UI Q7. Odoo UI dagi Developer Menu (Chigirtka belgisi 🐞) orqali nimalar bajariladi?

- **Fields View Get / Edit View:** Joriy XML ko'rinishni tahrirlash.
- **View Metadata:** Yozuv ID si, yaratuvchisi va yaratilgan vaqtini ko'rish.
- **Set Defaults:** Maydon uchun standart qiymat o'rnatish.
- **Access Rights:** Model uchun ruxsatlarni tekshirish.

---

### UI Q8. UI orqali jadval ustunlarini yashirish (Hide Column) va ko'rsatish qanday bajariladi?

**EN:** Click the three dots icon (`...`) on the top-right of List/Tree View to toggle visibility of optional columns.

**UZB:** Tree View o'ng yuqori burchagidagi uch nuqta (`...`) tugmasini bosib, kerakli ustunlarni yoqish yoki o'chirish mumkin.

---

### UI Q9. Mass Editing (Ommaviy tahrirlash) va Export/Import funksiyalari UI da qanday ishlatiladi?

**EN:** Select multiple checkboxes in List View -> click **Action -> Export** to download CSV/Excel, or click **Import records** to upload bulk external data. Select multiple rows to perform mass edits.

**UZB:** List View da bir nechta qatorlarni belgilab **Action -> Export** orqali yuklab olish yoki **Import records** orqali yangi ma'lumotlarni ommaviy yuklash mumkin.

---

### UI Q10. Form View da Readonly, Required va Invisible atributlari foydalanuvchiga qanday ta'sir qiladi?

- **Readonly:** Maydonni tahrirlab bo'lmaydi (faqat o'qish uchun).
- **Required:** Maydon majburiy, to'ldirilmasa saqlab bo meydi (qizil bilan ajratiladi).
- **Invisible:** Maydon foydalanuvchi ko'zidan yashiriladi.

---

## 🟡 UI VIEW CUSTOMIZATION & ODOO STUDIO (UI Q26 – UI Q55)

---

### UI Q26. Odoo Studio nima va u orqali UI da qanday o'zgarishlar kiritiladi?

**EN:** Odoo Studio is a no-code visual builder that allows non-developers to create new custom apps, add fields, design Form/Tree/Kanban views, create automated actions, and modify reports directly in the browser.

**UZB:** Odoo Studio — visual tuzuvchi bo'lib, kod yozmasdan brauzer orqali yangi ilovalar yaratish, yangi maydonlar qo'shish, Form/Tree ko'rinishlarini sozlash va avtomatik amallarni belgilash imkonini beradi.

---

### UI Q27. Studio orqali Form View ga yangi Maydon (Custom Field) qo'shish bosqichlari / Adding a Custom Field via Studio

```text
1. Open Target App (e.g. Contacts) -> Click Studio icon (Toggle Studio)
2. Drag & Drop desired field type (e.g. Selection, Monetary, Date) onto Form
3. Set Field Label, Technical Name, and Visibility properties
4. Close Studio -> Changes are immediately active!
```

---

### UI Q28. Kanban View da Drag & Drop (Uzatib tashlash) va Stages (Bosqichlar) qanday sozlanadi?

**EN:** Kanban views group cards by a `Selection` or `Many2one` stage field (e.g., `stage_id`). Dragging a card updates its stage attribute automatically.

**UZB:** Kanban ko'rinishi kartochkalarni bosqichlar bo'yicha guruhlaydi. Kartochkani surib o'tkazish (drag & drop) uning bosqich atributini avtomatik yangilaydi.

---

### UI Q29. Graph View va Pivot View orqali Dinamik Grafiklarni yaratish / Dynamic Charts via Graph & Pivot View

- **Graph View:** Bar chart, Line chart va Pie chart shaklida vizualizatsiya qiladi.
- **Pivot View:** X va Y o'qlar bo'yicha o'lchovlarni (Measures) yig'ib jadval ko'rinishida beradi.

---

### UI Q30. Gantt View va Calendar View nima uchun ishlatiladi?

- **Gantt View:** Loyihalar va ishlab chiqarish rejalarini vaqt shkalasi (timeline) bo'yicha rejalashtirish.
- **Calendar View:** Uchrashuvlar va bajariladigan vazifalarni kalendar oynasida ko'rish.

---

### UI Q31-Q55. Smart Buttons, Automated Actions in UI, Print PDF Reports Customization, Sequence numbers in UI & Multi-Company view setup.

---

## 🔴 FUNCTIONAL WORKFLOWS: SALES, PURCHASE, INVENTORY (UI Q56 – UI Q80)

---

### UI Q56. Sotuv Sikli (Sales Workflow): Quotation -> Sale Order -> Delivery -> Invoice

**EN:** The standard Sales flow starts with a **Quotation** (Taklif) sent to customer -> confirmed into a **Sale Order** -> triggers **Stock Delivery** -> generates **Customer Invoice** upon delivery.

**UZB:** Sotuv sikli: **Quotation** (Tijorat taklifi) -> Tasdiqlash -> **Sale Order** -> Ombor yetkazishi (**Delivery**) -> Hisob-faktura (**Customer Invoice**).

```text
Quotation (Draft) --[Confirm]--> Sale Order --[Validate Delivery]--> Invoice Sent
```

---

### UI Q57. Xarid Sikli (Purchase Workflow): RFQ -> Purchase Order -> Goods Receipt -> Vendor Bill

**EN:** **RFQ** (Request for Quotation) -> Confirmed **PO** (Purchase Order) -> **Receive Products** into inventory -> Create & Pay **Vendor Bill**.

**UZB:** Xarid sikli: **RFQ** -> Tasdiqlash -> **Purchase Order** -> Mahsulotni qabul qilish (**Receipt**) -> Sotuvchi hisob varag'i (**Vendor Bill**).

---

### UI Q58. Ombor Operatsiyalari (Inventory Dropshipping, Cross-Docking, Reordering Rules)

- **Reordering Rules:** Zaxira belgilangan minimal miqdordan tushib ketsa, avtomatik xarid buyurtmasi yaratadi.
- **Dropshipping:** Mahsulotomborga kirmasdan to'g'ridan-to'g'ri etkazib beruvchidan xaridorga boradi.

---

### UI Q59. Multi-Warehouse va Multi-Location sozlamalari UI da qanday yoqiladi?

**EN:** Enable `Inventory -> Settings -> Warehouse -> Multi-Step Routes & Storage Locations`.

**UZB:** `Ombor (Inventory) -> Sozlamalar -> Multi-Step Routes & Storage Locations` yoqiladi.

---

### UI Q60. Barcode App va Mobil Interfeys bilan Omborda Ishtirok Etish / Barcode Operations in UI

---

## ⚫ ACCOUNTING, HR, POS & ADMIN SETTINGS (UI Q81 – UI Q100)

---

### UI Q81. Buxgalteriya va To'lovlarni Moslashtirish (Bank Reconciliation) / Bank Reconciliation in UI

**EN:** Bank reconciliation matches imported bank statement transactions with customer invoices and vendor bills to confirm cash balances.

**UZB:** Bank rekonsilyatsiyasi bank ko'chirmasidagi to'lovlarni tizimdagi hisob-fakturalar bilan moslashtiradi.

---

### UI Q82. Point of Sale (PoS) Offlayn Rejimda Ishlashi va Kassani Yopish (Session Closing)

**EN:** Odoo PoS runs locally in browser storage (IndexedDB) and continues making sales even if Internet fails, syncing data once connection restores.

**UZB:** Odoo PoS brauzer xotirasida offlayn ishlay oladi. Internet uzilsa ham sotuv davom etadi va ulanganda avtomatik sinxronlanadi.

---

### UI Q83. HR & Payroll: Xodimlarni Boshqarish, Davomat va Ta'til So'rovlari / HR, Attendance & Time Off

---

### UI Q84. Manufacturing (MRP): Bill of Materials (BOM) va Work Order izchilligi

```text
Product -> Bill of Materials (BOM) -> Manufacturing Order -> Work Center Operations -> Finished Goods
```

---

### UI Q85. User Access Rights va Record Rules sozlamalarini UI orqali boshqarish

**EN:** `Settings -> Users & Companies -> Access Rights` defines model permissions (Create, Read, Write, Delete). `Record Rules` filter data dynamically by domain (e.g. user sees only own records).

**UZB:** `Sozlamalar -> Foydalanuvchilar -> Access Rights` obyekt darajasida ruxsat beradi. `Record Rules` esa ma'lumotlarni dinamik filtrlashni boshqaradi (masalan, faqat o'z sotuvlarini ko'rish).

---

### UI Q86-Q100. Multi-Currency setup, Tax engines, Security Groups, Automated Backup in UI, Translation Manager & App Store Module Installation.

---

*Prepared by | Tayyorlagan: Alyorjon*  
*Sources | Manbalar: Odoo Functional Documentation, Odoo Academy, Odoo User Guide*
