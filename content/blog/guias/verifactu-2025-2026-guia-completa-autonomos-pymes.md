---
title: "Verifactu 2025-2026: Guía Completa para Autónomos y Pymes"
excerpt: "Todo lo que necesitas saber sobre Verifactu sin tecnicismos. Fechas oficiales, quién está obligado, la trampa de Excel, sanciones reales y cómo prepararte antes de que sea tarde."
publishedAt: "2025-11-25"
author: "Equipo Invoo"
tags: ["verifactu", "autonomos", "pymes", "facturacion", "hacienda", "sif", "guia-completa"]
readingTime: 18
featured: true
editorPick: true
coverImage: "/blog/verifactu-guide.png"
keyTakeaways:
  - "Verifactu obliga a tu software de facturación a generar un código QR oficial en cada factura desde 2026"
  - "Excel con fórmulas (incluso =A1*1.21 para IVA) te obliga a cumplir Verifactu desde julio 2026"
  - "Fechas clave: 29 julio 2025 (software listo), 1 enero 2026 (sociedades), 1 julio 2026 (autónomos)"
  - "La multa por usar software no conforme es de 50.000€ fijos por ejercicio fiscal, independientemente de tu facturación"
---

**Aviso legal:** Esta guía tiene carácter informativo y no constituye asesoramiento fiscal profesional. La normativa tributaria está sujeta a cambios. Para decisiones específicas sobre tu caso, consulta siempre con un asesor fiscal colegiado. Información actualizada a noviembre de 2025.

---

Son las 11 PM del 30 de junio de 2026.

Mañana arranca la obligación de Verifactu para autónomos. Abres Google. Buscas "¿qué es Verifactu?". Te salen 147 artículos. Todos hablan de "SIF", "hash encadenado", "XML", "registros de alta".

Cierras el portátil.

**¿Te suena?**

No estás solo. Verifactu es una de las normativas más confusas de los últimos años, no porque sea compleja, sino porque nadie te la ha explicado como lo que es: **un QR en tu factura que evita que Hacienda piense que haces trampas.**

Así de simple.

En este artículo encontrarás todo lo que necesitas saber sin tocar una sola línea de código. Sin XML. Sin tecnología. Solo lo que realmente importa para facturar sin líos a partir de 2026.

---

## El problema real: ¿por qué existe Verifactu?

Imagina que tienes una tienda. Al final del día, borras algunas ventas de caja. Le dices a Hacienda que vendiste 100€. Pero en realidad vendiste 200€. Te ahorras el IVA de esos 100€ fantasma.

**Eso es lo que algunos negocios hacían con software de "doble uso".**

Hacienda lo sabe. Y dice: "Se acabó. A partir de 2026, **todas las facturas** que hagas con un programa de ordenador llevarán un **código QR oficial** que garantiza que no has borrado nada."

**Verifactu = sistema antifraude para software de facturación.**

No es la factura electrónica (eso es otra cosa). No es para particulares que facturan completamente a mano. Es **para quien use programas o automatismos de facturación**.

Y sí, **afecta al 90% de autónomos**.

---

## Las fechas que sí están confirmadas (no hay prórroga)

**29 de julio de 2025**
Los fabricantes de software DEBEN tener sus programas adaptados. Si tu software no está listo para esta fecha, cambia de software YA.

**1 de enero de 2026**
**Obligatorio para sociedades** (S.L., S.A., y todas las entidades sujetas al Impuesto sobre Sociedades según el artículo 3.1.a del Real Decreto)

**1 de julio de 2026**
**Obligatorio para autónomos** y resto de empresarios

**Fuente oficial:** [Real Decreto 254/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-6600) publicado en el BOE. Estas fechas NO van a cambiar. No se ha anunciado periodo de gracia oficial.

---

## ¿Te aplica Verifactu? Guía rápida de decisión

### SÍ estás obligado

**Autónomo con software de facturación**
Si usas [Quipu](https://getquipu.com), [Holded](https://www.holded.com), [Billin](https://www.billin.net), [Invoo](https://invoo.es) o cualquier otro programa de facturación → **Obligado desde el 1 de julio de 2026**

**Sociedad (S.L., S.A.) con software**
Cualquier entidad sujeta al Impuesto sobre Sociedades que use software de facturación → **Obligada desde el 1 de enero de 2026**

**Excel/Word CON fórmulas**
Si calculas IVA, totales o sumas con cualquier fórmula (aunque sea `=A1*1.21`) → **Obligado desde el 1 de julio de 2026**

### NO estás obligado

**Excel/Word SIN fórmulas**
Si usas Excel o Word como una máquina de escribir (100% manual, sin ninguna fórmula) → **No te aplica Verifactu**

**Facturas manuscritas**
Si haces facturas completamente a mano en papel o talonarios → **No te aplica Verifactu**

**Ya estás en el SII**
Si ya usas el [Suministro Inmediato de Información de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/suministro-inmediato-informacion.html) → **Ya estás cubierto, no necesitas Verifactu adicional**

**País Vasco o Navarra con TicketBAI**
Si tu domicilio fiscal está en territorio foral y ya usas [TicketBAI](https://www.batuz.eus/es/ticketbai) → **Tienes tu propio sistema, Verifactu no te aplica**

**Alquileres de vivienda (particulares)**
Si eres particular que alquila vivienda → **No te aplica Verifactu**

### Depende de tu caso

**Régimen de módulos (estimación objetiva)**
La situación es más compleja. Consulta la sección "El caso especial de los módulos" más abajo. En general: si solo emites tickets simplificados a consumidor final y todo es manual → probablemente exento. Si usas TPV o software → obligado.

---

## La trampa de Excel/Word (Lee esto antes de seguir)

**Esto es lo más confuso de toda la normativa:**

Muchísimos autónomos usan Excel para facturar. Y la mayoría piensa: "Excel no es un programa de facturación, estoy exento."

**ERROR FATAL.**

### La regla REAL (Consulta Vinculante V2653-24 de la DGT):

**Excel/Word como "máquina de escribir" = NO obligado:**
- Escribes TODO a mano en cada celda
- **CERO fórmulas** (ni siquiera `=A1*1.21` para calcular IVA)
- No usas macros
- No calculas nada automáticamente
- Solo escribes y guardas/imprimes

**Excel/Word con CUALQUIER automatismo = SÍ obligado:**
- Usas **cualquier fórmula** (aunque sea simple)
- Calculas totales, IVA, subtotales automáticamente
- Usas macros o funciones
- Generas resúmenes, listados o informes
- Auto-numeras facturas
- Exportas datos a otros programas

### La cita oficial que cambia todo:

> "Si la consultante utiliza hojas de cálculo, bases de datos o procesadores **no se puede concluir que no resulte obligada** por el Reglamento"
> — Dirección General de Tributos, [Consulta V2653-24](https://petete.tributos.hacienda.gob.es/consultas/?num_consulta=V2653-24)

**Traducción:** Si usas Excel → Probablemente estés obligado.

### ¿Qué pasa en la práctica?

**El 99% de la gente que usa Excel para facturar:**
- Calcula el IVA con una fórmula (`=Subtotal * 1.21`)
- Suma automáticamente líneas de concepto
- Tiene la numeración correlativa automatizada
- Copia datos entre facturas

**Eso YA es un "Sistema Informático de Facturación" (SIF).**

**Por tanto:**
- Excel con fórmulas = Verifactu te aplica desde julio 2026
- Multa si no cumples: 50.000€

### La "Regla de los 4 NO" para estar exento

Según la Consulta Vinculante V0058-25 de febrero de 2025, solo estás exento si cumples los 4 NO:

1. **NO produces** ningún sistema informático de facturación
2. **NO comercializas** ningún SIF
3. **NO usas** ningún SIF (ni Excel con fórmulas)
4. **NO posees** ningún SIF

**Importante:** Si usas un sistema informático para CUALQUIER factura, debes cumplir Verifactu para TODAS tus facturas.

### ¿Cómo saber si tu Excel califica como exento?

**Pregúntate:**
¿Calculas algo automáticamente en tu Excel? (IVA, totales, restas, sumas)

- **SÍ** → Estás usando un SIF → Verifactu te aplica
- **NO** → Puede que estés exento (pero ¿de verdad no calculas NADA?)

**La realidad brutal:**

Si haces más de 3 facturas al mes, **necesitas automatizar** (o pierdes 2 horas/mes).

Y si automatizas aunque sea mínimamente → Ya estás obligado a Verifactu.

**Recomendación:**

No juegues con fuego. Asume que si usas Excel con fórmulas, **estás obligado**. La multa de 50.000€ no compensa el ahorro de usar software gratuito.

---

## Qué es Verifactu EN SIMPLE (sin XML ni hashes)

**Verifactu = Tu software debe:**

1. **Generar un código QR** en cada factura (con datos fiscales básicos)
2. **Garantizar que no puedes borrar** facturas sin dejar rastro
3. **Permitir que Hacienda verifique** esas facturas cuando quiera

**Eso es todo.**

El resto (hash, encadenamiento, firma electrónica) son cosas técnicas que hace TU SOFTWARE. Tú no tocas nada.

### Lo que sí verás tú:

**Antes de Verifactu (ahora):**
```
Factura #2025-0042
Cliente: María López
Total: 1.210€ (1.000€ + 21% IVA)
```

**Con Verifactu (desde 2026):**
```
Factura #2026-0042
Cliente: María López
Total: 1.210€ (1.000€ + 21% IVA)

[QR CODE aquí] ← NOVEDAD
"VERI*FACTU" o "Factura verificable en la Sede electrónica de la AEAT"
```

**¿Qué cambia para ti?**
Nada. El QR lo genera el software. Tú solo haces la factura como siempre.

**¿Qué cambia para tu cliente?**
Puede escanear el QR y verificar que la factura está registrada. Sabe que no es falsa.

---

## Los 2 caminos: Verifactu SÍ vs Verifactu NO

Tu software puede funcionar de dos formas:

### Opción 1: VERI*FACTU (con envío automático)

**Qué hace:**
Cada vez que emites una factura, tu software **envía automáticamente** un "registro" a Hacienda con los datos clave (NIF, número, fecha, importe).

**Ventajas:**
- Tu cliente puede verificar al instante que la factura está en Hacienda
- Si Hacienda te inspecciona, ya lo tienen todo
- Más "fiabilidad fiscal" (buena imagen)
- La factura debe mostrar "VERI*FACTU" o "Factura verificable en la Sede electrónica de la AEAT"

**Desventajas:**
- Hacienda tiene TODAS tus facturas en tiempo real (algunos lo ven como invasivo)

### Opción 2: NO VERI*FACTU (sin envío automático)

**Qué hace:**
Tu software **guarda los registros** de forma segura internamente. NO los envía. Solo cuando Hacienda te los pide (inspección), los entregas.

**Ventajas:**
- No compartes tus facturas hasta que Hacienda lo solicite
- Más "privacidad" (relativa, porque en inspección lo das igual)

**Desventajas:**
- Tu cliente NO puede verificar la factura en el momento (pero puede enviar los datos del QR a la AEAT para contraste futuro)
- Si Hacienda inspecciona, debes poder entregar todo

**¿Cuál elegir?**

**Para microempresas y autónomos simples → VERI*FACTU** (más simple, Hacienda ya tiene todo, menos líos en inspección).

**Para empresas con ERP estable → NO VERI*FACTU** (si tu sistema ya es robusto y prefieres no enviar en tiempo real).

**En Invoo te damos ambas opciones** para que decidas según tu caso.

---

## El famoso código QR: qué lleva dentro y para qué sirve

**Contenido del QR (obligatorio):**
- NIF del emisor
- Número de serie + número de factura
- Fecha de emisión
- Importe total
- URL a la sede de la AEAT para verificar

**Formato técnico:**
```
https://www2.aeat.es/wlpl/TIKE-CONT/ValidarQR?nif=89890001K&numserie=12345678&G33&fecha=01-01-2026&importe=1210.00
```

**Tamaño:**
Entre 30×30 mm y 40×40 mm (como un sello de correos). Debe cumplir el estándar ISO/IEC 18004 con nivel M de corrección de errores.

**Ubicación:**
Al principio de la factura, antes del contenido principal

**Para qué sirve:**

**Si usas VERI*FACTU:**
Tu cliente escanea → Hacienda compara → Responde:
- "Factura encontrada" (todo OK)
- "Factura no encontrada" (algo raro)

**Si usas NO VERI*FACTU:**
Tu cliente escanea → Envía datos a Hacienda → Hacienda lo guarda para futuro contraste

**En resumen:**
El QR es la forma de que tu cliente (y Hacienda) sepan que tu factura es legítima y no ha sido borrada.

---

## El caso especial de los módulos

**Esto genera mucha confusión, así que vamos a aclararlo:**

Los autónomos en **régimen de módulos (estimación objetiva)** tienen una situación particular porque su tributación se basa en parámetros objetivos, no en facturación real.

**Estás EXENTO si:**
- Solo emites tickets simplificados a consumidores finales
- No usas ningún sistema informático para facturar
- Toda tu facturación es manual

**Estás OBLIGADO si:**
- Emites facturas completas a otras empresas (B2B)
- Usas TPV informatizado o software de facturación
- Realizas actividades mixtas (parte módulos, parte estimación directa)

**La realidad:** La mayoría de los autónomos en módulos que emiten cualquier tipo de factura o ticket con software deberán cumplir Verifactu desde el 1 de julio de 2026.

**Consulta con tu gestoría** para tu caso específico, ya que la AEAT puede emitir clarificaciones adicionales.

---

## Casos prácticos reales

### Caso 1: Laura, diseñadora freelance (100% a particulares)

**Situación:**
Usa Canva para presupuestos. Tiene una plantilla de Excel donde pone:
- Nombre del cliente (celda A5)
- Concepto (celda A10)
- Precio sin IVA (celda B10)
- IVA 21% (celda C10 con fórmula `=B10*0.21`)
- Total (celda D10 con fórmula `=B10+C10`)

Guarda el Excel como PDF y lo envía.

**¿Le aplica Verifactu?**
**SÍ.** Aunque sea Excel, está usando fórmulas para calcular IVA y totales. Eso ya es un "Sistema Informático de Facturación".

**¿Qué debe hacer?**
1. **Opción A:** Cambiar a software Verifactu ([Invoo](https://invoo.es), [Holded](https://www.holded.com), [Quipu](https://getquipu.com)) antes de julio 2026
2. **Opción B:** Usar la [app gratuita de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) (si hace pocas facturas)
3. **Opción C:** Seguir con Excel SIN fórmulas (escribir totales a mano) → Inviable si hace +5 facturas/mes

**Riesgo de no hacer nada:**
Multa de 50.000€ por usar Excel con fórmulas sin cumplir Verifactu.

**Con [Invoo](https://invoo.es):**
- Factura en 30 segundos
- QR automático desde julio 2026
- Ahorra 8 horas/mes
- Coste: 10,90€/mes (menos que un café al día)

Además, con un software adecuado podrás controlar mejor tus gastos deducibles. Consulta las [15 deducciones fiscales que puedes aprovechar como autónomo](/es/blog/consejos/15-deducciones-fiscales-autonomos-espana/).

---

### Caso 2: Javier, consultor IT (80% empresas, 20% particulares)

**Situación:**
Usa [Holded](https://www.holded.com). Factura a empresas españolas (le retienen 15%) y a algunos particulares.

**¿Le aplica Verifactu?**
SÍ. Usa software. Obligado desde **1 julio 2026**.

**Qué debe hacer:**
1. **Antes del 29 julio 2025:** Verificar que Holded actualiza para Verifactu
2. **Julio 2026:** Sus facturas llevarán QR automático
3. **Decidir:** ¿VERI*FACTU (envío auto) o NO VERI*FACTU (sin envío)?

**Recomendación para Javier:**
VERI*FACTU. Al ser consultor con clientes corporativos, el envío automático le da más "fiabilidad fiscal". Sus clientes grandes lo valorarán.

---

### Caso 3: Marta, propietaria de S.L. con 3 empleados (ferretería)

**Situación:**
Tiene un TPV conectado a software de facturación. Vende a público general y a pequeñas empresas.

**¿Le aplica Verifactu?**
SÍ. Es sociedad + usa software. Obligada desde **1 enero 2026**.

**Qué debe hacer:**
1. **Antes de octubre 2025:** Su proveedor de TPV debe adaptar el sistema
2. **Enero 2026:** TODAS sus facturas (incluso tickets simplificados) llevarán QR
3. **Formación:** Sus empleados deben saber que NO se puede "borrar" una venta

**Crítico:**
Si usa un TPV antiguo sin actualización → Multa de 50.000€. Debe cambiar YA.

---

## Las sanciones reales (sin exagerar)

### Sanción principal: uso de software no conforme

**[Artículo 201 bis de la Ley General Tributaria](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186#a201bis):**

**Multa fija:** 50.000€ **por ejercicio fiscal**

**¿Por qué?**
- Usar software que no cumple Verifactu
- Usar Excel con fórmulas sin cumplir requisitos
- Usar software alterado ("doble uso")
- **Poseer** software no conforme (aunque no lo uses activamente)

**Ejemplo real:**
Autónomo sigue usando Excel con fórmulas desde julio 2026 hasta diciembre 2028.
→ 50.000€ (2026) + 50.000€ (2027) + 50.000€ (2028) = **150.000€**

**¿Es proporcional a tu facturación?**
NO. Es fija. Da igual si facturas 10.000€ o 500.000€. La multa es la misma.

### Otras sanciones relacionadas

**Para fabricantes de software no conforme:**
→ Multa de 150.000€ por ejercicio y por cada tipo de software fraudulento

**Datos incorrectos en facturas:**
→ Hasta 1% del importe de las operaciones según el régimen general de infracciones de facturación (Art. 201 LGT). La aplicación específica a errores de Verifactu está pendiente de clarificación por la AEAT.

**Defectos formales de facturación:**
→ Sanciones según el régimen general de facturación. Los importes específicos para errores de QR aún no han sido oficialmente publicados por la AEAT, pero se espera que sigan el marco general (mínimo 300€ por factura).

**Consecuencias adicionales:**
- Inspecciones más frecuentes
- Liquidaciones complementarias con recargos
- Intereses de demora
- Daño reputacional (clientes corporativos rechazan proveedores sin Verifactu)

---

## Errores comunes que cuestan dinero

### Error #1: "Todavía tengo tiempo"

**Pensamiento:** "Julio 2026 está lejos, ya lo miraré en abril"
**Realidad:** Tu software debe estar certificado ANTES del 29 julio 2025. Si esperas al último momento, no habrá plazas ni soporte disponible.

**Acción:**
Habla con tu proveedor de software HOY. Pregunta: "¿Estaréis listos para Verifactu?"

---

### Error #2: "No me aplica porque facturo con Excel simple"

**Pensamiento:** "Solo uso Excel con unas fórmulas básicas, no es un programa de facturación"
**Realidad:** Si calculas IVA o totales con fórmulas → Estás usando un SIF → Verifactu te aplica.

**Consulta oficial V2653-24:**
"Si utiliza hojas de cálculo [...] no se puede concluir que no resulte obligada"

**Acción:**
Si tu Excel tiene UNA SOLA fórmula → Asume que estás obligado. Cambia a software certificado.

---

### Error #3: "Mi software cumple porque lo dice en la web"

**Pensamiento:** "Mi programa dice 'compatible con Verifactu', vale"
**Realidad:** PIDE la **declaración responsable** por escrito que certifique cumplimiento técnico.

**Acción:**
Exige a tu proveedor:
- Certificado de cumplimiento firmado
- Fecha de disponibilidad de la actualización
- Plan de migración (si cambias de software)

---

### Error #4: "Ya tengo factura electrónica, estoy cubierto"

**Pensamiento:** "Uso Facturae para Administración Pública, estoy OK"
**Realidad:** Verifactu ≠ Factura electrónica. Son DOS cosas distintas.

**Diferencia:**
- **Factura electrónica B2B:** formato de intercambio entre empresas ([Ley Crea y Crece](https://www.boe.es/buscar/act.php?id=BOE-A-2022-15818), pendiente de desarrollo reglamentario)
- **Verifactu:** requisitos de tu software de facturación (YA en vigor, fechas 2026)

Puedes tener uno sin el otro. Necesitas AMBOS.

---

### Error #5: "Borro una factura mal hecha y hago una nueva"

**Con Verifactu:** NO puedes borrar. La numeración se ROMPE.
**Correcto:** Emites una **factura rectificativa** (anulas + nueva)

**Verifactu detecta:**
- Saltos de numeración
- Facturas "desaparecidas"
- Modificaciones sin rastro

**Consecuencia:** Multa + sospecha de fraude

---

## Checklist: ¿Estás listo para Verifactu?

**Antes del 29 julio 2025:**
- [ ] Confirmado con tu proveedor: "¿Software listo para Verifactu?"
- [ ] Recibida declaración responsable de cumplimiento
- [ ] Fecha de actualización agendada
- [ ] Plan B si tu proveedor falla (alternativas como Invoo)
- [ ] Si usas Excel: evaluado si tus fórmulas te obligan (spoiler: sí)

**Julio 2025 - Diciembre 2025 (si eres sociedad):**
- [ ] Software actualizado e instalado
- [ ] Equipo formado (no se borran facturas, se rectifican)
- [ ] Probado: emitir factura + generar QR + verificar

**Enero - Junio 2026 (si eres autónomo):**
- [ ] Software actualizado e instalado
- [ ] Fórmate bien en el nuevo flujo
- [ ] Primera factura de prueba con QR generada
- [ ] Verificado QR con la app de la AEAT

**Desde tu fecha límite:**
- [ ] TODAS las facturas llevan QR automático
- [ ] Decides: ¿VERI*FACTU (envío) o NO VERI*FACTU (sin envío)?
- [ ] Conservas registros accesibles 4 años + año en curso

---

## FAQ Express: 15 preguntas críticas

**1. ¿Puedo seguir facturando en Word/Excel?**
Depende. ¿Usas fórmulas? → NO, estás obligado a Verifactu.
¿Escribes todo a mano sin calcular nada? → SÍ, pero es inviable para +5 facturas/mes. Consulta nuestra guía sobre [errores comunes de autónomos principiantes](/es/blog/consejos/5-errores-comunes-autonomos-principiantes/) para más información.

**2. ¿Me obligarán a usar Verifactu si facturo a mano?**
NO. Solo si usas software o Excel con fórmulas.

**3. ¿Excel con una fórmula simple para IVA me obliga?**
SÍ. Cualquier fórmula = Sistema Informático de Facturación = Obligado.

**4. ¿El QR lleva información sensible?**
NO. Solo: NIF, número factura, fecha, importe. Nada más.

**5. ¿Mis clientes pueden ver mi facturación total?**
NO. Cada QR solo verifica ESA factura. No ven tu histórico.

**6. ¿Puedo cambiar de VERI*FACTU a NO VERI*FACTU?**
SÍ, pero una vez que empiezas a enviar (VERI*FACTU), debes seguir hasta fin de año natural.

**7. ¿Qué pasa si mi cliente no puede escanear el QR?**
Nada. El QR es para verificación opcional. La factura sigue siendo válida.

**8. ¿Y si estoy en módulos?**
Depende de si emites facturas B2B o usas software. Consulta la sección específica de módulos en esta guía y con tu gestoría.

**9. ¿Puedo editar una factura después de emitirla?**
NO. Debes hacer una **rectificativa** (R1, R2, etc.). Verifactu registra TODO.

**10. ¿Tengo que pagar por usar Verifactu?**
Depende:
- Si usas el [formulario gratuito de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) (para autónomos simples) → Gratis
- Si usas software comercial ([Invoo](https://invoo.es), [Holded](https://www.holded.com), [Quipu](https://getquipu.com)) → Lo incluyen en tu tarifa

¿Te preguntas por qué el software español cuesta más? Lee nuestro [análisis del precio del software de facturación en España](/es/blog/analisis/por-que-software-facturacion-espanol-cuesta-mas/).

**11. ¿Qué pasa si mi software no está listo para julio 2025?**
Cambia de software ANTES del 29 julio. Si no, estarás en falta desde enero/julio 2026.

**12. ¿Me multarán por un error técnico puntual?**
Si es un fallo momentáneo que corriges rápido → Justificable.
Si usas Excel con fórmulas sin cumplir durante meses → Multa de 50.000€.

**13. ¿Verifactu sustituye al modelo 303 o al 130?**
NO. Verifactu es para facturación. Los modelos 303 (IVA) y 130 (IRPF) siguen igual. Consulta nuestra [guía completa del Modelo 303 vs Modelo 130](/es/blog/guias/modelo-303-vs-modelo-130-guia-autonomos/) para entender las diferencias.

**14. ¿Cómo sé si mi software cumple?**
PIDE la declaración responsable del fabricante. Si no te la dan → Huye.

**15. ¿País Vasco y Navarra también?**
NO. Tienen TicketBAI (su propio sistema). No les aplica Verifactu.

---

## Lo que Invoo hace por ti (sin tecnicismos)

**Desde el primer día:**
- QR automático en todas tus facturas
- Series y numeración correlativa sin fallos
- Rectificativas guiadas (no rompes la secuencia)
- Registro de eventos (lo exige Verifactu, lo hacemos nosotros)

**Tú decides:**
- **VERI*FACTU:** Envío automático a Hacienda con cada factura
- **NO VERI*FACTU:** Guardamos todo seguro, entregas solo si Hacienda pide

**Dashboard en tiempo real:**
```
Facturas este mes: 47
   Enviadas a AEAT: 47 ✓
   QR generados: 47 ✓
   Errores: 0 ✓
```

**Sin sorpresas:**
Sabes en cada momento si estás cumpliendo. Exportas CSV para tu gestoría. Listo.

**Invoo estará certificado ANTES del 29 julio 2025.**
No tendrás que cambiar de software. Actualizamos, tú sigues facturando.

---

## Timeline visual: cuándo hacer qué

```
▼ HOY - Julio 2025
└─ Verifica que tu software estará listo
└─ Si usas Excel con fórmulas: busca alternativa YA
└─ Solicita declaración responsable
└─ Familiarízate con Verifactu (lee este artículo)

▼ 29 Julio 2025
└─ FECHA LÍMITE FABRICANTES
└─ Software debe estar homologado

▼ Agosto - Diciembre 2025 (si eres SOCIEDAD)
└─ Actualiza tu software
└─ Forma a tu equipo
└─ Prueba: emite factura con QR

▼ 1 Enero 2026
└─ OBLIGATORIO PARA SOCIEDADES (S.L., S.A.)
└─ Todas las facturas con QR desde HOY

▼ Enero - Junio 2026 (si eres AUTÓNOMO)
└─ Actualiza tu software
└─ Fórmate bien
└─ Prueba: emite factura con QR

▼ 1 Julio 2026
└─ OBLIGATORIO PARA AUTÓNOMOS
└─ Todas las facturas con QR desde HOY
└─ Excel con fórmulas → 50.000€ de multa

▼ Desde tu fecha límite
└─ Facturación normal
└─ QR automático
└─ Tranquilidad
```

---

## El último consejo: anticípate

**El mayor error no es técnico. Es psicológico.**

La tentación será decir: "Ya lo haré el mes antes". Mal.

**Por qué anticiparse:**

1. **Software saturado:** En mayo 2026, todos los autónomos querrán lo mismo. No habrá soporte técnico disponible.

2. **Curva de aprendizaje:** Tu primer mes con Verifactu cometerás pequeños errores (QR mal ubicado, rectificativas mal hechas). Mejor cometerlos ANTES de la fecha límite.

3. **Inspecciones:** Hacienda cazará a los últimos. Si esperas hasta julio 2026 (día límite), estarás en el radar. Si empiezas en enero, demuestras buena fe.

4. **Clientes corporativos:** Las empresas grandes ya están pidiendo que sus proveedores tengan Verifactu. Si tú no lo tienes y tu competidor sí → pierdes el cliente.

5. **Excel ya no sirve:** Si usas Excel con fórmulas (como el 99% de autónomos), necesitas migrar. Eso toma tiempo.

**Recomendación:**

- **Si eres sociedad:** Ten Verifactu operativo en **octubre 2025** (3 meses antes)
- **Si eres autónomo:** Ten Verifactu operativo en **abril 2026** (3 meses antes)
- **Si usas Excel con fórmulas:** Cambia YA (no esperes a junio 2026)

Así tienes margen para fallos. No juegas con fuego.

---

## Conclusión: Verifactu no es el enemigo

**Verifactu existe para eliminar el fraude.**

Sí, es un cambio. Sí, requiere adaptar tu software. Pero **NO es complejo** si usas herramientas que lo hacen por ti.

**La clave:**
1. Elige software que esté listo para Verifactu ANTES del 29 julio 2025
2. Si usas Excel con fórmulas → Cambia a software certificado (no hay excepciones)
3. Fórmate (este artículo es un buen inicio)
4. Anticípate 3 meses a tu fecha límite
5. Factura como siempre. El QR sale solo.

**Verifactu bien hecho = más credibilidad fiscal + menos inspecciones.**

**Verifactu mal hecho (o Excel con fórmulas sin cumplir) = 50.000€ de multa + estrés.**

La diferencia está en usar las herramientas correctas.

---

**¿Quieres facturar con Verifactu sin complicaciones?**

Invoo genera tu QR automáticamente desde julio 2026. Series correlativas. Rectificativas guiadas. Dashboard en tiempo real. Sin tecnicismos. Sin sorpresas.

**[Prueba Invoo gratis durante 14 días](https://invoo.es)** - Sin tarjeta de crédito, sin compromisos, con Verifactu incluido desde el primer día.

---

## Fuentes oficiales consultadas

- [Real Decreto 1007/2023 (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840) - Reglamento Verifactu
- [Real Decreto 254/2025 (BOE)](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-6600) - Modificación de plazos
- [Orden HAC/1177/2024 (BOE)](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-22138) - Especificaciones técnicas
- [Consulta Vinculante V2653-24 (DGT)](https://petete.tributos.hacienda.gob.es/consultas/?num_consulta=V2653-24) - Excel/Word como SIF
- [AEAT - Sistemas Verifactu](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) - Información oficial
- [AEAT - Preguntas Frecuentes Verifactu](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes/sistemas-verifactu.html)
- [AEAT - FAQ Ámbitos de aplicación](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes/cuestiones-generales-ambitos-aplicacion.html)
- [Artículo 201 bis LGT](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) - Régimen sancionador
- [Ley 11/2021 Antifraude](https://www.boe.es/buscar/doc.php?id=BOE-A-2021-11473) - Origen de Verifactu

*Última actualización: Noviembre 2025*
