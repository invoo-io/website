---
title: "Factura Proforma vs Presupuesto: Diferencias y Cuándo Usar Cada Uno"
excerpt: "Descubre las diferencias entre factura proforma y presupuesto, cuándo usar cada uno y cómo convertirlos en factura definitiva sin errores. Guía práctica 2026."
publishedAt: "2026-02-10"
author: "Equipo Invoo"
tags: ["factura proforma", "presupuesto", "facturación", "obligaciones fiscales", "verifactu"]
readingTime: 16
featured: false
editorPick: false
coverImage: "/blog/factura-proforma-vs-presupuesto.webp"
keyTakeaways:
  - "La factura proforma NO tiene validez fiscal: el IVA mostrado es informativo y no es deducible ni declarable"
  - "Los presupuestos son vinculantes una vez aceptados, y facturar más del presupuesto puede derivar en reclamación judicial"
  - "Software con Verifactu no puede borrar proformas sin dejar rastro: deben conservarse vinculadas a facturas definitivas"
  - "Si envías una proforma pensando que has facturado, Hacienda sanciona con el 1-2% del importe no facturado (infracción grave) y hasta el 75% en caso de falsificación"
sources:
  - name: "AEAT - Contenido y requisitos de las facturas"
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/facturacion-registro/facturacion-iva/contenido-facturas.html"
  - name: "BOE - Real Decreto 1619/2012 (Reglamento de Facturación)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696"
  - name: "BOE - Real Decreto Legislativo 1/2007 (LGDCU)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555"
  - name: "AEAT - Verifactu: Preguntas frecuentes"
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes/cuestiones-generales-conceptos-definiciones.html"
lastVerified: "Febrero 2026"
faq:
  - question: "¿Puedo cobrar un anticipo con una factura proforma?"
    answer: "No. La proforma no tiene validez fiscal y no sustituye a la factura definitiva. Para cobrar anticipos legalmente, debes emitir una factura de anticipo completa con numeración oficial e IVA declarable. Si cobras con proforma, Hacienda lo considerará una operación no facturada."
  - question: "¿La factura proforma lleva numeración oficial?"
    answer: "No está obligada. Si decides numerarlas, debes usar una serie separada de las facturas oficiales (ejemplo: PRO-001, PRO-002). Nunca mezcles series de proformas con facturas definitivas porque generarías huecos en la numeración oficial que Hacienda puede sancionar."
  - question: "¿Puedo modificar un presupuesto después de aceptado?"
    answer: "Técnicamente no, porque el presupuesto aceptado es un contrato vinculante. Si necesitas cambiar condiciones, debes negociar con el cliente y emitir un presupuesto rectificativo o adenda que ambos firmen. Facturar más del presupuesto aceptado puede ser reclamado judicialmente por el cliente."
  - question: "¿Tengo que conservar las proformas para Verifactu?"
    answer: "Sí. Aunque las proformas no están sujetas a Verifactu (no llevan QR ni hash), el software que las genera debe ser conforme. Además, las proformas deben conservarse vinculadas a las facturas definitivas durante el periodo de conservación obligatorio (4 años AEAT, 6 años Código de Comercio)."
  - question: "¿Qué pasa si facturo menos del presupuesto aceptado?"
    answer: "No hay problema legal si facturas menos. El presupuesto establece el precio máximo, no el mínimo. Pero el cliente puede exigir explicaciones sobre el cambio de precio si es significativo. Lo profesional es avisar previamente y confirmar el nuevo importe antes de facturar."
---

Tu cliente te dice: "¿Me puedes hacer una proforma para autorización interna?". Abres tu software de facturación y dudas. **¿Es lo mismo que un presupuesto?** ¿Tiene validez fiscal? ¿Puede pagarte con eso?

Esa confusión es más común de lo que parece. Y cara. Cada año, miles de autónomos cometen errores con proformas y presupuestos que derivan en sanciones de Hacienda, reclamaciones de clientes o cobros imposibles de regularizar.

Pero aquí está lo que nadie te cuenta: **factura proforma y presupuesto son documentos diferentes**, con efectos legales opuestos y momentos de uso muy distintos. Mezclarlos es el error más frecuente en facturación comercial.

En esta guía desmontamos ambos documentos pieza por pieza. Qué son, qué efectos fiscales tienen, cuándo usar cada uno, cómo convertirlos en factura y los errores que disparan sanciones.

---

## Qué es una factura proforma (y qué NO es)

La **factura proforma** es un documento comercial previo a la factura definitiva. Es una simulación de factura que muestra al cliente qué importe exacto pagará, con IVA incluido, antes de formalizar la operación. Pero atención: **no tiene ninguna validez fiscal**.

La proforma no está regulada por el Real Decreto 1619/2012 (Reglamento de Facturación). Esto significa que Hacienda no la considera documento contable ni fiscal. **No puedes declararla en el Modelo 303**. No puedes registrarla en tus libros contables. No sustituye a la factura definitiva.

### Características fiscales de la proforma

**IVA informativo:** El IVA que muestras en una proforma es puramente orientativo. **No es deducible para el cliente**. No lo declaras en el Modelo 303. No tiene efectos contables. Si tu cliente intenta deducir el IVA de una proforma, comete una infracción grave ante Hacienda con multas del 50%-100% del IVA indebidamente deducido.

**Numeración opcional:** Las proformas no están sujetas a numeración obligatoria. Si decides numerarlas para control interno, **debes usar una serie separada** de las facturas oficiales. Ejemplo: PRO-001, PRO-002, PRO-003. Nunca mezcles series. Si numeras PRO-010 y luego emites factura oficial 011, Hacienda detectará un hueco en la numeración oficial y puede sancionarte con el 1% del importe de las operaciones afectadas (Art. 201 LGT) por [errores de facturación](/es/blog/consejos/errores-facturacion-autonomos-sanciones-hacienda).

**No sujeta a Verifactu:** La proforma no genera código QR ni hash criptográfico. No se envía a Hacienda. Pero cuidado: si tu software de facturación también emite facturas definitivas, **el sistema completo debe ser Verifactu-conforme** (el requisito es la integridad del sistema, no de cada documento individual). Y las proformas deben conservarse vinculadas a las facturas definitivas durante 4 años (AEAT) o 6 años (Código de Comercio).

### Lo que SÍ puedes hacer con una proforma

**Autorización interna del cliente:** Empresas grandes requieren proformas para aprobar presupuestariamente la compra antes de comprometerse. La proforma circula por departamentos de compras, finanzas, dirección. Una vez aprobada, te piden la factura definitiva.

**Comercio internacional:** En exportaciones, la proforma sirve como documento aduanero provisional que detalla el valor de la mercancía antes del envío. Facilita trámites de importación en destino. **Pero no sustituye a la factura comercial definitiva** que emites tras el envío.

**Solicitud de financiación:** Bancos o entidades de crédito piden proformas para evaluar préstamos o líneas de financiación. La proforma demuestra el importe exacto de la operación futura.

### Lo que NO puedes hacer con una proforma

**Cobrar un anticipo:** Si cobras dinero con una proforma, estás realizando una operación no facturada. **Hacienda lo considera infracción grave** porque no declaras el IVA repercutido. Para cobrar anticipos legalmente, necesitas una [factura de anticipo](/es/blog/guias/como-emitir-factura-rectificativa-guia) completa con numeración oficial e IVA declarable.

**Registrarla en contabilidad fiscal:** Introducir proformas en tus libros contables como ingresos declarables distorsiona tus declaraciones fiscales. Puedes registrarlas en tu sistema de gestión comercial como documentos precontractuales, pero **nunca como operaciones contables en el Libro de Ingresos**. Muchos autónomos que usan Excel caen en la trampa de registrar proformas como ingresos reales.

**Enviarla pensando que has facturado:** Este es el error más peligroso. Envías una proforma por email, el cliente paga, pero tú nunca emites la factura definitiva. **Hacienda lo detecta en inspecciones cruzadas** (el cliente declaró el gasto, tú no declaraste el ingreso). La sanción por no emitir factura es del 2% del importe de la operación (Art. 201 LGT), aumentando según el volumen no declarado y si existe ocultación deliberada.

---

## Qué es un presupuesto y sus requisitos legales

El **presupuesto** es un documento precontractual cuyo carácter vinculante deriva del derecho contractual general, la protección al consumidor (Real Decreto Legislativo 1/2007, LGDCU) y normativa sectorial específica (RD 1457/1986 para vehículos, RD 58/1988 para electrodomésticos). A diferencia de la proforma, **el presupuesto sí tiene efectos legales vinculantes** una vez aceptado por el cliente.

### Carácter vinculante del presupuesto

Un presupuesto aceptado es un contrato. Si tu cliente acepta verbalmente o por escrito, **ambos quedáis obligados**: tú a entregar el servicio/producto por ese precio, él a pagarlo. Si facturas más del presupuesto sin avisar, el cliente puede reclamarlo judicialmente mediante juicio monitorio (Art. 812 Ley 1/2000).

### Requisitos legales obligatorios

**Precio final completo:** Debes indicar el precio total con todos los impuestos incluidos. No puedes dejar conceptos "a determinar" o "según consumo" sin rango de precios. **El cliente debe saber exactamente cuánto pagará**.

**Plazo de entrega:** Si aplica, debes especificar cuándo entregarás el trabajo o producto. Plazos vagos ("en breve", "pronto") no cumplen la ley. Indica fechas concretas o rangos realistas.

**Periodo de validez:** El presupuesto debe incluir hasta cuándo es válido. Ejemplo: "Este presupuesto es válido hasta el 28 de febrero de 2026". Pasada esa fecha, puedes modificar precios sin comprometerte.

### Sectores con obligación legal de presupuesto

**Reparación de vehículos:** Obligatorio emitir presupuesto por escrito. **Validez mínima de 12 días hábiles** desde la entrega al cliente (el taller puede ofrecer plazos superiores). Si el cliente no responde en ese plazo, el taller puede considerar el presupuesto rechazado.

**Reparación de electrodomésticos:** Presupuesto obligatorio. **Validez mínima de 30 días naturales**. El técnico debe informar del coste estimado antes de proceder a la reparación.

**Construcción y reformas:** Aunque no obligatorio por ley general, es práctica estándar. Un presupuesto detallado protege a ambas partes en caso de disputas sobre alcance del trabajo o sobrecostes.

### IVA en presupuestos

A diferencia de la proforma, el IVA en un presupuesto **no es declarable hasta que emitas la factura definitiva**. El presupuesto es un compromiso de precio, no una operación fiscal. **Debes incluir el IVA desglosado** para que el cliente sepa el coste final, pero no lo declaras en el Modelo 303 hasta facturar.

---

## Factura proforma vs presupuesto: las 5 diferencias clave

Aquí está la comparación directa que resuelve la confusión más común en facturación comercial.

### 1. Validez fiscal y contable

**Factura proforma:** Cero validez fiscal. No se registra en contabilidad. No se declara en Modelo 303. El IVA es informativo, no declarable ni deducible.

**Presupuesto:** Sin validez fiscal hasta convertirse en factura. Pero el precio es legalmente vinculante. No se registra en contabilidad, pero sí puede ser prueba contractual en tribunales.

### 2. Obligación de numeración

**Factura proforma:** Numeración opcional. Si numeras, debes usar serie separada (PRO-001, PRO-002). Nunca mezcles con facturas oficiales. No hay obligación de continuidad en la numeración de proformas.

**Presupuesto:** Sin obligación de numeración. Muchos autónomos los numeran para control interno (PRES-2026-001), pero no es requisito legal ni fiscal.

### 3. Carácter vinculante

**Factura proforma:** No vinculante. Es una simulación comercial que puedes modificar ilimitadamente sin consecuencias legales. No obliga al cliente a comprar ni a ti a vender a ese precio.

**Presupuesto:** Vinculante una vez aceptado. El cliente puede reclamar judicialmente si facturas más del presupuesto. Tú puedes reclamar si el cliente rechaza pagar tras aceptar. **La aceptación puede ser verbal o escrita**, ambas válidas legalmente, aunque la verbal es más difícil de probar en caso de disputa judicial.

### 4. Flexibilidad de modificación

**Factura proforma:** Modificable sin límites. Puedes enviar proforma v1, v2, v3 con precios diferentes hasta que el cliente confirme. No necesitas justificar cambios porque no hay compromiso contractual.

**Presupuesto:** Modificable solo antes de la aceptación. Una vez aceptado, cualquier cambio requiere negociación y nuevo consentimiento del cliente. Si cambias precio tras aceptación sin avisar, el cliente puede rechazar la factura y exigir el precio original.

### 5. Relación con Verifactu

**Factura proforma:** No está sujeta a Verifactu. No genera QR, no se envía a Hacienda, no tiene hash. **Pero el software debe ser conforme** si también emite facturas oficiales. Y las proformas deben conservarse vinculadas a facturas definitivas—no puedes borrarlas sin dejar rastro.

**Presupuesto:** Sin relación con Verifactu porque no es documento fiscal. No requiere software específico. Puedes hacerlo en Word, Excel, email o cualquier formato. Verifactu (con entrada en vigor el 1 de julio de 2027 para autónomos) solo afecta a facturas definitivas. Para entender cómo afecta tu facturación, consulta nuestra [guía completa de Verifactu](/es/blog/guias/verifactu-2025-2026-guia-completa-autonomos-pymes).

### Tabla de decisión rápida

**Usa factura proforma cuando:**

- El cliente necesita autorización interna antes de comprarse
- Realizas exportaciones que requieren documentación aduanera provisional
- El cliente pide un documento con IVA desglosado para planificación presupuestaria
- Quieres mostrar descuentos o condiciones comerciales sin compromiso

**Usa presupuesto cuando:**

- Ofreces un servicio con precio variable según alcance (diseño, consultoría, reformas)
- Trabajas en sectores con obligación legal (reparación vehículos/electrodomésticos)
- Necesitas protección legal sobre el precio acordado
- El cliente puede aceptar verbalmente y quieres documentar el compromiso

---

## Cuándo usar cada uno (con ejemplos por sector)

La decisión entre proforma y presupuesto depende del sector, tipo de cliente y momento de la relación comercial. Aquí están los casos prácticos reales.

### Cuándo usar factura proforma

**Exportaciones internacionales:** Carlos exporta maquinaria industrial a Colombia. El importador necesita la proforma para gestionar trámites aduaneros y solicitar divisas al banco central. Carlos emite proforma PRO-2026-045 con precio CIF (coste, seguro y flete incluido). Una vez la mercancía llega y se confirma, emite factura definitiva 2026-178 con numeración oficial.

**Aprobación en empresas grandes:** Laura ofrece consultoría de marketing a una multinacional. El director de marketing necesita autorización del CFO para contratar. Laura envía proforma con desglose detallado de horas, entregables y precio total con IVA. Dos semanas después, el cliente aprueba internamente y pide la factura definitiva. Laura emite la factura oficial 2026-089.

**Servicios a administración pública:** Miguel participa en licitaciones públicas. La administración exige proforma junto con la oferta técnica para evaluar el coste económico. Miguel presenta proforma sin numeración oficial (solo referencia interna). Si gana la licitación, emitirá factura oficial según los términos del contrato adjudicado.

### Cuándo usar presupuesto

**Reformas y construcción:** Ana es arquitecta técnica especializada en rehabilitación de viviendas. Un cliente pide presupuesto para reforma de cocina. Ana envía presupuesto PRES-2026-012 detallando materiales, mano de obra, plazo (8 semanas) y precio total €15.400 con IVA. **El cliente acepta verbalmente por teléfono**. Ese presupuesto es vinculante. Si Ana factura €18.000 sin avisar, el cliente puede reclamar judicialmente la diferencia.

**Servicios profesionales con alcance variable:** David es diseñador gráfico freelance. Un cliente pide identidad corporativa completa. David envía presupuesto con tres opciones: básica (€2.500), intermedia (€4.200), premium (€6.800). El cliente elige la intermedia. Ese precio queda fijado. Si David añade extras sin consultar y factura €5.500, el cliente puede rechazar el sobrecoste.

**Reparación de vehículos (obligatorio):** Un taller recibe un coche con problemas de motor. Por ley, debe emitir presupuesto escrito indicando: diagnóstico, piezas necesarias, mano de obra, plazo estimado y precio total. **Validez mínima 12 días hábiles**. Si el cliente acepta, el taller puede proceder. Si el presupuesto caduca sin respuesta, puede devolver el vehículo sin reparar.

### Sectores híbridos: cuándo usar ambos

**Software y desarrollo:** Una agencia recibe solicitud de desarrollo web. Primer paso: envía presupuesto PRES-2026-034 con alcance funcional, fases, hitos y precio €28.000 + IVA. **El cliente acepta**. Antes de empezar, la agencia envía proforma PRO-2026-091 solicitando anticipo del 40% (€11.200). Pero para cobrar ese anticipo legalmente, **debe emitir factura de anticipo oficial 2026-203** con numeración consecutiva y declarar el IVA repercutido en el Modelo 303. La proforma sirvió solo para confirmar el importe internamente con el cliente.

**Consultoría con clientes corporativos:** Un consultor cierra proyecto con empresa mediana. Envía presupuesto vinculante con precio por jornada y estimación de 20 jornadas (€18.000 total). El cliente acepta. Luego envía proforma para autorización interna del departamento de compras. **La proforma replica el presupuesto ya aceptado**, pero sirve para que el cliente tramite la aprobación presupuestaria. Finalmente, emite facturas mensuales según avance del proyecto.

### El error más común: mezclar ambos

**Caso real:** Un autónomo envía "presupuesto-proforma" combinando ambos documentos. El cliente interpreta que es un compromiso vinculante y acepta. El autónomo cree que es solo orientativo y cambia el precio. **Conflicto garantizado**. Si vas a tribunal, el juez analizará el contenido y la intención: si incluye precio cerrado y plazo, es presupuesto vinculante aunque lo llames proforma.

**Solución:** Usa documentos separados con nombres claros. "Presupuesto n.º X" cuando quieras compromiso. "Factura proforma PRO-X" cuando sea simulación sin compromiso. Nunca combines nombres en un solo documento.

---

## De presupuesto a factura: el flujo correcto

Aquí está el proceso paso a paso para convertir presupuestos y proformas en facturas definitivas sin errores fiscales ni reclamaciones de clientes.

### Flujo: Presupuesto → Aceptación → Factura definitiva

**Paso 1: Emite el presupuesto completo**

Incluye todos los elementos obligatorios: precio total con IVA desglosado, plazo de entrega, periodo de validez del presupuesto, forma de pago. **Especifica las condiciones**: anticipo requerido (si aplica), penalizaciones por retraso, garantías.

**Paso 2: Obtén aceptación clara del cliente**

La aceptación puede ser verbal (llamada telefónica, videollamada) o escrita (email, firma en papel, WhatsApp). **Documenta siempre la aceptación**. Si es verbal, envía email confirmatorio: "Según conversación telefónica de hoy 10/02/2026, confirmo tu aceptación del presupuesto PRES-2026-015 por €8.400. Inicio trabajo el lunes 17/02." Si el cliente no responde rectificando, la confirmación es válida.

**Paso 3: Ejecuta el trabajo según presupuesto**

**No te desvíes del presupuesto sin avisar**. Si durante el trabajo detectas necesidad de cambios que aumentan coste o plazo, para y consulta al cliente. Emite presupuesto adicional o adenda al original. Que el cliente acepte por escrito antes de continuar.

**Paso 4: Emite la factura definitiva con numeración oficial**

Finalizado el trabajo, emite factura definitiva con numeración correlativa de tu serie oficial (no reutilices números de presupuesto ni proforma). **Referencia el presupuesto**: "Según presupuesto PRES-2026-015 de fecha 05/02/2026". Esto vincula ambos documentos y protege ante posibles disputas.

El importe de la factura debe coincidir con el presupuesto aceptado. Si hay desviaciones menores previamente acordadas, detállalas en observaciones de la factura. Para comprender cómo aplicar correctamente las [retenciones de IRPF en tus facturas](/es/blog/guias/retencion-irpf-factura-7-o-15-guia-autonomos), consulta nuestra guía específica.

### Flujo: Proforma → Confirmación → Factura definitiva

**Paso 1: Emite la proforma para autorización**

Usa serie separada (PRO-XXX) o sin numeración. Incluye la mención visible: **"FACTURA PROFORMA - Sin validez fiscal"**. Muestra precio total con IVA desglosado. Especifica validez temporal: "Esta proforma tiene validez hasta 28/02/2026".

**Paso 2: Espera confirmación del cliente**

El cliente tramita autorización interna y te confirma: "Aprobado, procede a facturar". **Esa confirmación no es contractual vinculante** (a diferencia del presupuesto), pero sí es señal para emitir la factura definitiva.

**Paso 3: Emite factura definitiva inmediatamente**

No demores. Una vez confirmada la proforma, emite factura definitiva con numeración oficial consecutiva de tu serie. **Referencia la proforma**: "Según proforma PRO-2026-034 de fecha 03/02/2026". Si el importe cambió respecto a la proforma, especifica el motivo en observaciones.

**Paso 4: Conserva la proforma vinculada**

Archiva la proforma junto con la factura definitiva. Tu software de facturación debería permitir esta vinculación. **No borres proformas antiguas**: deben conservarse durante 4 años (AEAT) o 6 años (Código de Comercio) como parte de tu archivo mercantil.

### Errores críticos durante la conversión

**Error 1: Numerar proforma y factura con misma serie**

Proforma PRO-045 → Factura 2026-045. Parece lógico, pero es trampa. Si la proforma no se convierte en factura, tienes un hueco en numeración oficial. Hacienda puede interpretar que ocultaste una factura y sancionarte. **Usa siempre series separadas**.

**Error 2: Cobrar anticipos con proforma sin factura de anticipo**

Envías proforma, el cliente paga el 50%, empiezas el trabajo. Pero no emitiste factura de anticipo oficial. Cuando Hacienda cruce datos, detectará que cobraste €5.000 sin factura. **Sanción del 2% del importe de la operación** (Art. 201 LGT), con importes mayores según la gravedad. Para cobrar anticipos legalmente, debes emitir factura de anticipo con numeración oficial y declarar el IVA en el Modelo 303 del trimestre del cobro.

**Error 3: Facturar más del presupuesto aceptado sin avisar**

Presupuesto aceptado: €8.000. Factura definitiva: €9.500. Cliente reclama. Si no documentaste la aceptación del sobrecoste, el cliente puede exigir judicialmente que devuelvas €1.500 + intereses. **Tribunal le dará la razón** porque el presupuesto aceptado es contrato vinculante.

**Error 4: Registrar proformas en contabilidad**

Introduces proformas en tu software contable como ingresos. Tu Modelo 303 incluye IVA de operaciones no facturadas oficialmente. **Hacienda detecta la incongruencia** en inspección: declaraste IVA de facturas que no existen en numeración oficial. Además de sanciones, deberás rectificar todas las declaraciones afectadas.

**Error 5: No conservar proformas tras emitir factura definitiva**

Crees que la proforma ya no sirve y la borras. Tres años después, inspección de Hacienda solicita documentación completa de una operación. Falta la proforma que justifica el proceso comercial. Aunque no sea sancionable directamente, **genera desconfianza y puede derivar en inspección más exhaustiva**. Conserva siempre todo el rastro documental.

### Checklist de conversión sin errores

Antes de emitir la factura definitiva, verifica:

- El importe coincide con presupuesto/proforma aceptada (o tienes confirmación escrita de cambios)
- La factura usa numeración oficial consecutiva de tu serie habitual
- Has referenciado el presupuesto/proforma en observaciones o campo de referencia
- Si cobraste anticipo, ya emitiste factura de anticipo oficial previa
- Conservas documentación de aceptación del cliente (email, firma, confirmación escrita)
- No hay huecos en tu numeración oficial por proformas no convertidas
- El software de facturación vincula automáticamente proforma → factura para trazabilidad

---

## Preguntas frecuentes

<AccordionGroup>

<AccordionGroupItem title="¿Puedo cobrar un anticipo con una factura proforma?" value="faq-1">

No. La proforma no tiene validez fiscal y no sustituye a la factura definitiva. Para cobrar anticipos legalmente, debes emitir una factura de anticipo completa con numeración oficial consecutiva de tu serie habitual e IVA declarable en el Modelo 303. Si cobras dinero presentando solo una proforma, Hacienda lo considerará una operación no facturada (infracción grave) con sanción del 2% del importe no facturado (Art. 201 LGT).

</AccordionGroupItem>

<AccordionGroupItem title="¿La factura proforma lleva numeración oficial?" value="faq-2">

No está obligada legalmente a llevar numeración. Si decides numerarlas para control interno (recomendable), debes usar una serie completamente separada de las facturas oficiales. Ejemplo: PRO-001, PRO-002, PRO-003. Nunca mezcles series de proformas con facturas definitivas porque generarías huecos en la numeración oficial que Hacienda puede interpretar como facturas ocultas, con sanciones del 1% del importe de las operaciones afectadas (Art. 201 LGT).

</AccordionGroupItem>

<AccordionGroupItem title="¿Puedo modificar un presupuesto después de aceptado?" value="faq-3">

Técnicamente no, porque el presupuesto aceptado es un contrato vinculante para ambas partes. Si durante la ejecución del trabajo detectas necesidad de cambios que aumentan coste o plazo, debes parar y consultarlo con el cliente antes de continuar. Emite un presupuesto adicional, adenda o presupuesto rectificativo que el cliente debe aceptar expresamente por escrito. Facturar más del presupuesto original sin este proceso puede ser reclamado judicialmente por el cliente mediante juicio monitorio.

</AccordionGroupItem>

<AccordionGroupItem title="¿Tengo que conservar las proformas para Verifactu?" value="faq-4">

Sí, aunque las proformas no están sujetas a Verifactu (no llevan código QR ni hash criptográfico, y no se envían a AEAT), el software que las genera debe ser Verifactu-conforme si también emite facturas oficiales. Además, las proformas deben conservarse vinculadas a las facturas definitivas correspondientes durante todo el periodo de conservación obligatorio: 4 años según normativa AEAT, 6 años según Art. 30 del Código de Comercio. El software no puede permitir borrar proformas sin dejar rastro de su existencia.

</AccordionGroupItem>

<AccordionGroupItem title="¿Qué pasa si facturo menos del presupuesto aceptado?" value="faq-5">

No hay problema legal si facturas menos del presupuesto aceptado. El presupuesto establece el precio máximo vinculante, no el mínimo. Sin embargo, el cliente puede exigir explicaciones sobre por qué el trabajo costó menos de lo estimado, especialmente si la diferencia es significativa. Lo profesional es avisar previamente al cliente del ajuste de precio y confirmar el nuevo importe antes de facturar. Esto mantiene la transparencia y evita malentendidos que puedan dañar la relación comercial.

</AccordionGroupItem>

</AccordionGroup>

---

**¿Cansado de confundir proformas, presupuestos y facturas definitivas?**

Invoo separa automáticamente cada tipo de documento con numeración independiente, te avisa si intentas cobrar con proforma, y genera facturas definitivas vinculadas al presupuesto original. Cumplimiento Verifactu incluido. €10.90/mes para autónomos, gratis para gestorías.

**[Únete a la lista de espera de Invoo](https://invoo.es)** - Los primeros 100 usuarios ahorran 50% para siempre.

---
