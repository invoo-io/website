---
title: "Verifactu 2025-2026: Guía Completa para Autónomos y Pymes"
excerpt: "Todo lo que necesitas saber sobre Verifactu sin tecnicismos. Fechas oficiales, quién está obligado, la trampa de Excel, sanciones reales y cómo prepararte antes de que sea tarde."
publishedAt: "2025-11-25"
author: "Equipo Invoo"
tags: ["verifactu", "autonomos", "pymes", "facturacion", "hacienda", "sif", "guia-completa"]
readingTime: 18
featured: false
editorPick: false
coverImage: "/blog/verifactu-guide.webp"
keyTakeaways:
  - "Verifactu obliga a tu software de facturación a generar un código QR oficial en cada factura desde 2026"
  - "Excel con fórmulas (incluso =A1*1.21 para IVA) te obliga a cumplir Verifactu desde julio 2026"
  - "Fechas clave: 29 julio 2025 (software listo), 1 enero 2026 (sociedades), 1 julio 2026 (autónomos)"
  - "La multa por usar software no conforme es de 50.000€ fijos por ejercicio fiscal, independientemente de tu facturación"
sources:
  - name: "Real Decreto 1007/2023 (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840"
  - name: "Real Decreto 254/2025 (BOE)"
    url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-6600"
  - name: "Orden HAC/1177/2024 (BOE)"
    url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-22138"
  - name: "Consulta Vinculante V2653-24 (DGT)"
    url: "https://petete.tributos.hacienda.gob.es/consultas/?num_consulta=V2653-24"
  - name: "AEAT - Sistemas Verifactu"
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html"
  - name: "AEAT - Preguntas Frecuentes Verifactu"
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes/sistemas-verifactu.html"
  - name: "AEAT - FAQ Ámbitos de aplicación"
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes/cuestiones-generales-ambitos-aplicacion.html"
  - name: "Artículo 201 bis LGT"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186"
  - name: "Ley 11/2021 Antifraude"
    url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2021-11473"
lastVerified: "Enero 2026"
faq:
  - question: "¿Puedo seguir facturando con Excel después de julio 2026?"
    answer: "Solo si escribes todo a mano sin usar NINGUNA fórmula. Si calculas IVA, totales o cualquier operación automáticamente, estás usando un Sistema Informático de Facturación y debes cumplir Verifactu. La multa por incumplimiento es de 50.000€."
  - question: "¿Qué es el código QR de Verifactu y para qué sirve?"
    answer: "Es un código que tu software genera automáticamente en cada factura con datos básicos (NIF, número, fecha, importe). Permite que tu cliente y Hacienda verifiquen que la factura es legítima y no ha sido borrada o modificada."
  - question: "¿Cuál es la multa por no cumplir con Verifactu?"
    answer: "La multa es de 50.000€ fijos por ejercicio fiscal, independientemente de tu facturación. Si usas software no conforme durante 3 años, acumulas 150.000€ en sanciones. La multa no es proporcional a tu volumen de negocio."
  - question: "¿Tengo que pagar por usar Verifactu?"
    answer: "Depende. La AEAT ofrece un formulario gratuito básico para autónomos simples. Si usas software comercial como Invoo, Holded o Quipu, Verifactu viene incluido en tu tarifa mensual sin coste adicional."
---


---

Son las 11 PM del 30 de junio de 2026.

Mañana arranca la obligación de Verifactu para autónomos. Abres Google. Buscas "¿qué es Verifactu?". Te salen 147 artículos.

Todos hablan de "SIF", "hash encadenado", "XML", "registros de alta".

Cierras el portátil.

**¿Te suena?**

No estás solo. Verifactu es una de las normativas más confusas de los últimos años, no porque sea compleja, sino porque nadie te la ha explicado como lo que es: **un QR en tu factura que evita que Hacienda piense que haces trampas.**

Así de simple.

En este artículo encontrarás todo lo que necesitas saber sin tocar una sola línea de código. Sin XML. Sin tecnología. Solo lo que realmente importa para facturar sin líos a partir de 2026.

---

## Qué es Verifactu y por qué existe

### El problema real: ¿por qué existe Verifactu?

Imagina que tienes una tienda. Al final del día, borras algunas ventas de caja.

Le dices a Hacienda que vendiste 100€. Pero en realidad vendiste 200€. Te ahorras el IVA de esos 100€ fantasma.

**Eso es lo que algunos negocios hacían con software de "doble uso".**

Hacienda lo sabe. Y dice: "Se acabó. A partir de 2026, **todas las facturas** que hagas con un programa de ordenador llevarán un **código QR oficial** que garantiza que no has borrado nada."

**Verifactu = sistema antifraude para software de facturación.**

No es la factura electrónica (eso es otra cosa). No es para particulares que facturan completamente a mano. Es **para quien use programas o automatismos de facturación**.

Y sí, **afecta al 90% de autónomos**.

### Qué es Verifactu EN SIMPLE (sin XML ni hashes)

**Verifactu = Tu software debe:**

1. **Generar un código QR** en cada factura (con datos fiscales básicos)
2. **Garantizar que no puedes borrar** facturas sin dejar rastro
3. **Permitir que Hacienda verifique** esas facturas cuando quiera

**Eso es todo.**

El resto (hash, encadenamiento, firma electrónica) son cosas técnicas que hace TU SOFTWARE. Tú no tocas nada.

### Lo que sí verás tú

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

### Los 2 caminos: VERI*FACTU vs NO VERI*FACTU

Tu software puede funcionar de dos formas:

**Opción 1: VERI*FACTU (con envío automático)**

Cada vez que emites una factura, tu software **envía automáticamente** un "registro" a Hacienda con los datos clave (NIF, número, fecha, importe).

**Ventajas:** Tu cliente puede verificar al instante que la factura está en Hacienda. Si Hacienda te inspecciona, ya lo tienen todo. Más "fiabilidad fiscal" (buena imagen). La factura debe mostrar "VERI*FACTU" o "Factura verificable en la Sede electrónica de la AEAT".

**Desventajas:** Hacienda tiene TODAS tus facturas en tiempo real (algunos lo ven como invasivo).

**Opción 2: NO VERI*FACTU (sin envío automático)**

Tu software **guarda los registros** de forma segura internamente. NO los envía. Solo cuando Hacienda te los pide (inspección), los entregas.

**Ventajas:** No compartes tus facturas hasta que Hacienda lo solicite. Más "privacidad" (relativa, porque en inspección lo das igual).

**Desventajas:** Tu cliente NO puede verificar la factura en el momento (pero puede enviar los datos del QR a la AEAT para contraste futuro). Si Hacienda inspecciona, debes poder entregar todo.

**¿Cuál elegir?**

**Para microempresas y autónomos simples → VERI*FACTU** (más simple, Hacienda ya tiene todo, menos líos en inspección).

**Para empresas con ERP estable → NO VERI*FACTU** (si tu sistema ya es robusto y prefieres no enviar en tiempo real).

**En Invoo te damos ambas opciones** para que decidas según tu caso.

---

## Fechas clave y quién está obligado

### Las fechas confirmadas (no hay prórroga)

**29 de julio de 2025**
Los fabricantes de software DEBEN tener sus programas adaptados. **Si tu software no está listo para esta fecha, cambia de software YA.**

**1 de enero de 2026**
**Obligatorio para sociedades** (S.L., S.A., y todas las entidades sujetas al Impuesto sobre Sociedades según el artículo 3.1.a del Real Decreto)

**1 de julio de 2026**
**Obligatorio para autónomos** y resto de empresarios

**Fuente oficial:** [Real Decreto 254/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-6600) publicado en el BOE. Estas fechas NO van a cambiar. No se ha anunciado periodo de gracia oficial.

### ¿Te aplica Verifactu? Guía rápida

**SÍ estás obligado si:**

- Usas software de facturación ([Quipu](https://getquipu.com), [Holded](https://www.holded.com), [Billin](https://www.billin.net), [Invoo](https://invoo.es)) → **Obligado desde julio 2026 (autónomos) o enero 2026 (sociedades)**
- Usas Excel/Word CON fórmulas (aunque sea `=A1*1.21` para calcular IVA) → **Obligado desde julio 2026**
- Tienes TPV informatizado o software conectado

**NO estás obligado si:**

- Excel/Word SIN fórmulas (100% manual, como máquina de escribir) → **No te aplica**
- Facturas manuscritas en papel o talonarios → **No te aplica**
- Ya usas el [SII de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/suministro-inmediato-informacion.html) → **Ya estás cubierto**
- País Vasco o Navarra con [TicketBAI](https://www.batuz.eus/es/ticketbai) → **Sistema propio, Verifactu no aplica**
- Particular que alquila vivienda → **No te aplica**

**Régimen de módulos (depende):**
Si solo emites tickets simplificados a consumidor final y todo es manual → probablemente exento. **Si usas TPV o software → obligado.** Consulta con tu gestoría para tu caso específico.

### La trampa de Excel/Word (LEE ESTO ANTES DE SEGUIR)

Muchísimos autónomos usan Excel para facturar. Y la mayoría piensa: "Excel no es un programa de facturación, estoy exento."

**ERROR FATAL.**

**La regla REAL según la Consulta Vinculante V2653-24:**

**Excel/Word como "máquina de escribir" = NO obligado:**
- Escribes TODO a mano en cada celda
- **CERO fórmulas** (ni siquiera `=A1*1.21` para calcular IVA)
- No usas macros ni calculas nada automáticamente
- Solo escribes y guardas/imprimes

**Excel/Word con CUALQUIER automatismo = SÍ obligado:**
- Usas **cualquier fórmula** (aunque sea simple)
- Calculas totales, IVA, subtotales automáticamente
- Usas macros, funciones, auto-numeración o exportas datos

**La cita oficial que cambia todo:**

> "Si la consultante utiliza hojas de cálculo, bases de datos o procesadores **no se puede concluir que no resulte obligada** por el Reglamento"
> — Dirección General de Tributos, [Consulta V2653-24](https://petete.tributos.hacienda.gob.es/consultas/?num_consulta=V2653-24)

**Traducción:** Si usas Excel → Probablemente estés obligado.

**El 99% de la gente que usa Excel para facturar:**
- Calcula el IVA con una fórmula (`=Subtotal * 1.21`)
- Suma automáticamente líneas de concepto
- Tiene la numeración correlativa automatizada

**Eso YA es un "Sistema Informático de Facturación" (SIF).**

**Por tanto:** Excel con fórmulas = Verifactu te aplica desde julio 2026. **Multa si no cumples: 50.000€.**

**La "Regla de los 4 NO" para estar exento:**

Según la Consulta Vinculante V0058-25 de febrero 2025, solo estás exento si cumples los 4 NO:

1. **NO produces** ningún sistema informático de facturación
2. **NO comercializas** ningún SIF
3. **NO usas** ningún SIF (ni Excel con fórmulas)
4. **NO posees** ningún SIF

**Importante:** Si usas un sistema informático para CUALQUIER factura, debes cumplir Verifactu para TODAS tus facturas.

**Recomendación final:**

Si haces más de 3 facturas al mes, **necesitas automatizar** (o pierdes 2 horas/mes). Y si automatizas aunque sea mínimamente → Ya estás obligado a Verifactu.

No juegues con fuego. Asume que si usas Excel con fórmulas, **estás obligado**. La multa de 50.000€ no compensa el ahorro de usar software gratuito.

---

## El código QR y requisitos técnicos

### Qué lleva el código QR

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

**Especificaciones:**
- **Tamaño:** Entre 30×30 mm y 40×40 mm (como un sello de correos)
- **Estándar:** ISO/IEC 18004 con nivel M de corrección de errores
- **Ubicación:** Al principio de la factura, antes del contenido principal

### Para qué sirve el QR

**Si usas VERI*FACTU:**
Tu cliente escanea → Hacienda compara → Responde:
- "Factura encontrada" (todo OK)
- "Factura no encontrada" (algo raro)

**Si usas NO VERI*FACTU:**
Tu cliente escanea → Envía datos a Hacienda → Hacienda lo guarda para futuro contraste

**En resumen:** El QR es la forma de que tu cliente (y Hacienda) sepan que tu factura es legítima y no ha sido borrada.

### Casos prácticos reales

**Caso 1: Laura, diseñadora freelance**

Usa una plantilla de Excel con fórmulas para calcular IVA (`=B10*0.21`) y totales (`=B10+C10`). Guarda como PDF y envía.

**¿Le aplica Verifactu?** SÍ. Aunque sea Excel, está usando fórmulas. Eso ya es un "Sistema Informático de Facturación".

**Soluciones:**
- Cambiar a software Verifactu ([Invoo](https://invoo.es), [Holded](https://www.holded.com), [Quipu](https://getquipu.com)) antes de julio 2026
- Usar la [app gratuita de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) (pocas facturas)
- Excel SIN fórmulas (escribir totales a mano) → Inviable si hace +5 facturas/mes

**Riesgo:** Multa de 50.000€ por usar Excel con fórmulas sin cumplir Verifactu.

**Caso 2: Javier, consultor IT**

Usa [Holded](https://www.holded.com). Factura a empresas españolas (le retienen 15%) y particulares.

**¿Le aplica?** SÍ. Usa software. **Obligado desde 1 julio 2026.**

**Acción:** Verificar que Holded actualiza para Verifactu antes del 29 julio 2025. Decidir: ¿VERI*FACTU (envío auto) o NO VERI*FACTU? Recomendación: VERI*FACTU para dar más fiabilidad fiscal a clientes corporativos.

**Caso 3: Marta, propietaria de S.L. con 3 empleados**

Tiene un TPV conectado a software de facturación. Vende a público general y pequeñas empresas.

**¿Le aplica?** SÍ. Es sociedad + usa software. **Obligada desde 1 enero 2026.**

**Acción:** Su proveedor de TPV debe adaptar el sistema antes de octubre 2025. TODAS las facturas (incluso tickets simplificados) llevarán QR desde enero 2026. **Crítico:** Formar a empleados—NO se puede "borrar" una venta. TPV antiguo sin actualización = multa de 50.000€.

Además, con un software adecuado podrás controlar mejor tus gastos deducibles. Consulta las [15 deducciones fiscales que puedes aprovechar como autónomo](/es/blog/consejos/15-deducciones-fiscales-autonomos-espana/).

---

## Sanciones, errores comunes y checklist

### Las sanciones reales

**[Artículo 201 bis de la Ley General Tributaria](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186#a201bis):**

**Multa fija:** 50.000€ **por ejercicio fiscal**

**¿Por qué te multan?**
- Usar software que no cumple Verifactu
- Usar Excel con fórmulas sin cumplir requisitos
- Usar software alterado ("doble uso")
- **Poseer** software no conforme (aunque no lo uses activamente)

**Ejemplo real:** Autónomo sigue usando Excel con fórmulas desde julio 2026 hasta diciembre 2028.
→ 50.000€ (2026) + 50.000€ (2027) + 50.000€ (2028) = **150.000€**

**¿Es proporcional a tu facturación?** NO. Es fija. Da igual si facturas 10.000€ o 500.000€. La multa es la misma.

**Otras sanciones:**
- **Para fabricantes de software no conforme:** 150.000€ por ejercicio
- **Datos incorrectos en facturas:** Hasta 1% del importe de las operaciones (Art. 201 LGT)
- **Defectos formales:** Mínimo 300€ por factura según marco general
- **Consecuencias adicionales:** Inspecciones más frecuentes, liquidaciones complementarias, intereses de demora, daño reputacional (clientes corporativos rechazan proveedores sin Verifactu)

### Los 5 errores que cuestan 50.000€

**Error 1: "Todavía tengo tiempo"**

Tu software debe estar certificado ANTES del 29 julio 2025. **Si esperas al último momento, no habrá plazas ni soporte disponible.**

Habla con tu proveedor HOY. Pregunta: "¿Estaréis listos para Verifactu?"

**Error 2: "No me aplica porque facturo con Excel simple"**

Si calculas IVA o totales con fórmulas → Estás usando un SIF → Verifactu te aplica. **Consulta oficial V2653-24:** "Si utiliza hojas de cálculo [...] no se puede concluir que no resulte obligada".

Si tu Excel tiene UNA SOLA fórmula → Asume que estás obligado. Cambia a software certificado.

**Error 3: "Mi software cumple porque lo dice en la web"**

PIDE la **declaración responsable** por escrito. Exige:
- Certificado de cumplimiento firmado
- Fecha de disponibilidad de la actualización
- Plan de migración (si cambias de software)

**Error 4: "Ya tengo factura electrónica, estoy cubierto"**

Verifactu ≠ Factura electrónica. Son DOS cosas distintas. **Factura electrónica B2B:** formato de intercambio entre empresas ([Ley Crea y Crece](https://www.boe.es/buscar/act.php?id=BOE-A-2022-15818), pendiente de desarrollo reglamentario). **Verifactu:** requisitos de tu software de facturación (YA en vigor, fechas 2026).

Puedes tener uno sin el otro. Necesitas AMBOS.

**Error 5: "Borro una factura mal hecha y hago una nueva"**

**Con Verifactu:** NO puedes borrar. La numeración se ROMPE. **Correcto:** Emites una **factura rectificativa** (anulas + nueva).

Verifactu detecta saltos de numeración, facturas "desaparecidas", modificaciones sin rastro. **Consecuencia:** Multa + sospecha de fraude.

Si quieres evitar errores con las facturas rectificativas, consulta nuestra [guía completa sobre cómo emitir facturas rectificativas](/es/blog/guias/como-emitir-factura-rectificativa-guia).

### Checklist de preparación

**Antes del 29 julio 2025:**
- Confirmado con tu proveedor: "¿Software listo para Verifactu?"
- Recibida declaración responsable de cumplimiento
- Fecha de actualización agendada
- Plan B si tu proveedor falla (alternativas como Invoo)
- Si usas Excel: evaluado si tus fórmulas te obligan (spoiler: sí)

**Julio 2025 - Diciembre 2025 (si eres sociedad):**
- Software actualizado e instalado
- Equipo formado (no se borran facturas, se rectifican)
- Probado: emitir factura + generar QR + verificar

**Enero - Junio 2026 (si eres autónomo):**
- Software actualizado e instalado
- Fórmate bien en el nuevo flujo
- Primera factura de prueba con QR generada
- Verificado QR con la app de la AEAT

**Desde tu fecha límite:**
- TODAS las facturas llevan QR automático
- Decides: ¿VERI*FACTU (envío) o NO VERI*FACTU (sin envío)?
- Conservas registros accesibles 4 años + año en curso

### Timeline visual: cuándo hacer qué

**HOY - Julio 2025**
Verifica que tu software estará listo. Si usas Excel con fórmulas: busca alternativa YA. Solicita declaración responsable. Familiarízate con Verifactu.

**29 Julio 2025**
FECHA LÍMITE FABRICANTES. Software debe estar homologado.

**Agosto - Diciembre 2025 (si eres SOCIEDAD)**
Actualiza tu software. Forma a tu equipo. Prueba: emite factura con QR.

**1 Enero 2026**
OBLIGATORIO PARA SOCIEDADES (S.L., S.A.). Todas las facturas con QR desde HOY.

**Enero - Junio 2026 (si eres AUTÓNOMO)**
Actualiza tu software. Fórmate bien. Prueba: emite factura con QR.

**1 Julio 2026**
OBLIGATORIO PARA AUTÓNOMOS. Todas las facturas con QR desde HOY. **Excel con fórmulas → 50.000€ de multa.**

**Desde tu fecha límite**
Facturación normal. QR automático. Tranquilidad.

### El consejo final: anticípate

**El mayor error no es técnico. Es psicológico.**

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

## Preguntas frecuentes

<AccordionGroup>

<AccordionGroupItem title="¿Puedo seguir facturando con Excel después de julio 2026?" value="faq-1">

Solo si escribes todo a mano sin usar NINGUNA fórmula. Si calculas IVA, totales o cualquier operación automáticamente (`=A1*1.21`), estás usando un Sistema Informático de Facturación y debes cumplir Verifactu.

**La multa por incumplimiento es de 50.000€ por ejercicio fiscal.**

En la práctica, si haces más de 3-5 facturas al mes, necesitas fórmulas para no perder tiempo. Por tanto, asume que estás obligado. Consulta nuestra guía sobre [errores comunes de autónomos principiantes](/es/blog/consejos/5-errores-comunes-autonomos-principiantes/) para más información.

</AccordionGroupItem>

<AccordionGroupItem title="¿Qué es el código QR de Verifactu y para qué sirve?" value="faq-2">

Es un código que tu software genera automáticamente en cada factura con datos básicos: NIF, número de factura, fecha e importe total. Permite que tu cliente y Hacienda verifiquen que la factura es legítima y no ha sido borrada o modificada.

**Si usas VERI*FACTU:** Tu cliente escanea el QR y Hacienda responde "Factura encontrada" o "Factura no encontrada".

**Si usas NO VERI*FACTU:** El QR envía los datos a Hacienda para futuro contraste en caso de inspección.

El QR NO contiene información sensible. Solo datos básicos de la factura. Tus clientes NO pueden ver tu facturación total—cada QR solo verifica ESA factura concreta.

</AccordionGroupItem>

<AccordionGroupItem title="¿Cuál es la multa por no cumplir con Verifactu?" value="faq-3">

La multa es de **50.000€ fijos por ejercicio fiscal**, independientemente de tu facturación. Si usas software no conforme durante 3 años, acumulas 150.000€ en sanciones.

**Importante:** La multa NO es proporcional a tu volumen de negocio. Da igual si facturas 10.000€ o 500.000€ al año—la sanción es la misma.

**¿Por qué te multan?**
- Usar software que no cumple Verifactu
- Usar Excel con fórmulas sin cumplir requisitos
- Usar software alterado ("doble uso")
- Poseer software no conforme (aunque no lo uses activamente)

Otras consecuencias: inspecciones más frecuentes, liquidaciones complementarias, intereses de demora, y daño reputacional (clientes corporativos rechazan proveedores sin Verifactu).

</AccordionGroupItem>

<AccordionGroupItem title="¿Tengo que pagar por usar Verifactu?" value="faq-4">

Depende de la opción que elijas:

**Opción gratuita:** La AEAT ofrece un [formulario web gratuito](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) básico para autónomos simples que hacen pocas facturas. Es funcional pero limitado—no tiene funcionalidades avanzadas como envío automático de facturas por email, gestión de clientes, o integraciones.

**Opción de pago:** Si usas software comercial como [Invoo](https://invoo.es), [Holded](https://www.holded.com) o [Quipu](https://getquipu.com), Verifactu viene incluido en tu tarifa mensual sin coste adicional. El software genera el QR automáticamente, gestiona las rectificativas correctamente, y te ahorra tiempo.

**Recomendación:** Si haces más de 5 facturas al mes, el software comercial compensa. Invoo cuesta 10,90€/mes y te ahorra 8+ horas mensuales. ¿Te preguntas por qué el software español cuesta más? Lee nuestro [análisis del precio del software de facturación en España](/es/blog/analisis/por-que-software-facturacion-espanol-cuesta-mas/).

</AccordionGroupItem>

</AccordionGroup>

---

**¿Quieres facturar con Verifactu sin complicaciones?**

Invoo genera tu QR automáticamente desde julio 2026. Series correlativas. Rectificativas guiadas. Dashboard en tiempo real. Sin tecnicismos. Sin sorpresas.

**[Únete a la lista de espera de Invoo](https://invoo.es)** - Los primeros 100 usuarios ahorran 50% para siempre. Verifactu incluido desde el primer día.

