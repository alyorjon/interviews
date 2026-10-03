# 💻 Odoo Technical Developer — Real-World Interview Questions & Answers
### Ikki tilli mukammal qo'llanma / Comprehensive Bilingual Reference (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:** Odoo ORM Models, Relational Fields, API Decorators, Controllers, Security Access CSV, QWeb Reports, OWL JS Components, Performance & Testing.  

---

# 📚 CHUQUR NAZARIYA VA DEVELOPER ARXITEKTURASI

---

## 1. Odoo ORM Framework Architecture
Odoo bu Python 3.10+ (Backend) + PostgreSQL (Database) + OWL JS Framework (Frontend Web Client) asosida qurilgan uch qatlamli (3-tier) arxitektura.

---

# 🟢 QUESTIONS & ANSWERS (Q1 – Q10)

---


## Q1. Model Types: Model, TransientModel, AbstractModel | Model, TransientModel va AbstractModel farqlari

**EN:** Model permanent DB table, TransientModel temporary for Wizards, AbstractModel reusable Mixin.

**UZB:** Model doimiy DB jadvali, TransientModel Wizard xotirasi, AbstractModel esa Mixin.

```python
class Patient(models.Model):
    _name = 'hospital.patient'
```

---

## Q2. Relational Fields (Many2one, One2many, Many2many) | Relational maydonlar va parametrlari

**EN:** Linking models together via Foreign Keys and join tables.

**UZB:** Relational maydonlar modellarni o'zaro bog'laydi.

```python
patient_id = fields.Many2one('hospital.patient', ondelete='cascade')
```

---

## Q3. Module Structure & Manifest | Modul strukturasi va __manifest__.py

**EN:** Standard directory structure with models, views, security, data.

**UZB:** Odoo modulining standart papka tuzilishi va manifest fayli.

```python
{'name': 'Hospital', 'depends': ['base'], 'data': ['views/patient_views.xml']}
```

---

## Q4. API Decorators (@api.depends, @api.onchange, @api.constrains) | Odoo API Dekoratorlari

**EN:** @api.depends computes values, @api.onchange runs in UI, @api.constrains validates.

**UZB:** @api.depends hisoblaydi, @api.onchange UI da ishlaydi, @api.constrains tekshiradi.

```python
@api.depends('price', 'qty')
def _compute_total(self):
    self.total = self.price * self.qty
```

---

## Q5. Environment API (self.env) | self.env obyekti atributlari

**EN:** Environment holds DB cursor, user uid, context, and model registry.

**UZB:** self.env DB kursorini, foydalanuvchini va kontekstni tutadi.

```python
patients = self.env['hospital.patient'].search([])
```

---

## Q6. Core ORM Methods (search, browse, create, write, unlink) | Asosiy ORM metodlari

**EN:** Standard CRUD methods for executing DB operations.

**UZB:** Yozuvlarni izlash, yaratish, tahrirlash va o'chirish metodlari.

```python
patient = self.env['hospital.patient'].create({'name': 'Ali'})
```

---

## Q7. Domain Expressions & Polish Notation | Domain sintaksisi va operatorlari

**EN:** Prefix notation filtering with AND (&), OR (|), and NOT (!).

**UZB:** Domainlar prefiks notatsiyasida rekordlarni filtrlash uchun ishlatiladi.

```python
domain = ['|', ('state', '=', 'draft'), ('amount', '>', 1000)]
```

---

## Q8. Recordset Operations (mapped, filtered, sorted) | Recordset metodlari

**EN:** mapped extracts fields, filtered applies lambda, sorted sorts recordset.

**UZB:** mapped ro'yxat ajratadi, filtered saralaydi, sorted tartiblaydi.

```python
adults = patients.filtered(lambda p: p.age >= 18)
```

---

## Q9. XML View Inheritance (<xpath>) | XML View meros olish va <xpath>

**EN:** Extending existing XML views dynamically using xpath.

**UZB:** Mavjud XML ko'rinishlarini xpath orqali kengaytirish.

```python
<xpath expr="//field[@name='vat']" position="after">
    <field name="passport"/>
</xpath>
```

---

## Q10. Access Rights CSV (ir.model.access.csv) | ir.model.access.csv ruxsatlar matritsasi

**EN:** Defining object-level Create, Read, Write, Delete permissions per group.

**UZB:** Model darajasida CRUD ruxsatlarini CSV faylida belgilash.

```python
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
```
