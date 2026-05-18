import type { Insect } from '../types/insect';

export const CAMPUS_LOCATIONS = [
  'Finca Orgánica',
  'Reserva Forestal',
  'Jardín de Mariposas',
  'Humedal Sur',
  'Arboretum',
  'Área de Compostaje',
  'Cafetal Agroforestal',
  'Sendero Ecológico',
] as const;

export const insects: Insect[] = [
  {
    id: 'bee-001',
    commonName: 'Abeja Jicote Gato',
    scientificName: 'Xylocopa frontalis',
    category: 'Abejas',
    ecologicalRole: 'Polinizador',
    campusLocation: ['Arboretum', 'Jardín de Mariposas', 'Finca Orgánica'],
    description:
      'Una de las abejas carpinteras más grandes de Centroamérica. Su vuelo vibratorio (buzz pollination) es esencial para cultivos como el tomate y la maracuyá.',
    detailedInfo: `## Abeja Jicote Gato (*Xylocopa frontalis*)

La *Xylocopa frontalis* es una abeja solitaria de gran tamaño que pertenece a la familia **Apidae**. Es fácilmente reconocible por su cuerpo robusto, color negro brillante con reflejos azulados y su característico vuelo sonoro.

### Biología y comportamiento
A diferencia de las abejas sociales, el Jicote Gato es solitario. Las hembras excavan nidos en madera muerta o bambú, donde depositan sus huevos junto a una provisión de néctar y polen. Pueden reutilizar el mismo nido por varios años.

### Importancia ecológica en EARTH
Realiza **polinización por vibración (sonication)**, un proceso único donde la abeja hace vibrar sus músculos de vuelo a una frecuencia específica para liberar el polen de anteras poricidas. Este mecanismo es indispensable para cultivos como tomate, pimentón y maracuyá en la Finca Orgánica.

### Identificación en campo
- Longitud: 20–28 mm
- Color: Negro metálico con tintes azulados
- Alas: Semitransparentes con iridiscencia violácea
- Las hembras tienen el abdomen completamente negro; los machos pueden tener manchas amarillas en la cara`,
    funFact:
      '¡Puede hacer vibrar su cuerpo a 400 Hz para liberar el polen de las flores, como si tocara una guitarra invisible!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Xylocopa_frontalis_male.jpg/640px-Xylocopa_frontalis_male.jpg',
    dangerLevel: 'Manipular con cuidado',
    conservationStatus: 'Preocupación menor',
    activityPeriod: 'Diurno',
    size: '20–28 mm',
    flightMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    observationCount: 47,
    lastObserved: '2026-05-10',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/199742',
  },
  {
    id: 'bee-002',
    commonName: 'Abeja Angelita / Mariola',
    scientificName: 'Tetragonisca angustula',
    category: 'Abejas',
    ecologicalRole: 'Polinizador',
    campusLocation: ['Cafetal Agroforestal', 'Arboretum', 'Sendero Ecológico'],
    description:
      'Diminuta abeja sin aguijón (meliponina) que produce una miel de altísimo valor medicinal. Es guardiana activa de su colmena y una aliada fundamental de la agroforestería en EARTH.',
    detailedInfo: `## Abeja Angelita (*Tetragonisca angustula*)

La *Tetragonisca angustula* es una de las abejas sin aguijón más estudiadas de América Tropical. Pertenece a la tribu **Meliponini** y su nombre común varía por región: "Angelita" en Costa Rica, "Jataí" en Brasil, "Virreina" en Colombia.

### Estructura social
Las colonias cuentan con 5,000 a 15,000 individuos. Son famosas por su sofisticado sistema de defensa: las **abejas guardianas** flotan en el aire frente a la entrada del nido en formación estática (hovering), listas para detectar intrusos. Pueden morder agresivamente pero no pican.

### Miel medicinal
Su miel tiene mayor contenido de agua (25–35%) que la miel de *Apis mellifera*, alta concentración de compuestos fenólicos y actividad antimicrobiana documentada. En EARTH se estudia su potencial en sistemas agroforestales sostenibles.

### Nido
Construyen la entrada del nido en forma de tubo de cera, a menudo en huecos de árboles o muros. La cera es de color oscuro y la propóleos tiene propiedades resinosas únicas.

### Importancia para la biodiversidad en EARTH
Son polinizadoras de al menos 37 familias de plantas y son indicadores de la salud de ecosistemas tropicales.`,
    funFact:
      'Sus guardianas se suspenden en el aire frente al nido como "drones" vivos — un comportamiento único entre los insectos sociales llamado "hovering defense".',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Tetragonisca_angustula_-_Flickr_-_treegrow_%281%29.jpg/640px-Tetragonisca_angustula_-_Flickr_-_treegrow_%281%29.jpg',
    dangerLevel: 'Inofensivo',
    conservationStatus: 'Preocupación menor',
    activityPeriod: 'Diurno',
    size: '4–5 mm',
    flightMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    observationCount: 83,
    lastObserved: '2026-05-15',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/119900',
  },
  {
    id: 'bee-003',
    commonName: 'Abeja Bala / Conga',
    scientificName: 'Xylocopa dimidiata',
    category: 'Abejas',
    ecologicalRole: 'Polinizador',
    campusLocation: ['Reserva Forestal', 'Cafetal Agroforestal'],
    description:
      'Abeja nativa mediana con franjas amarillas. Importante polinizadora de plantas nativas del sotobosque y cultivos bajo sombra en los sistemas agroforestales del campus.',
    detailedInfo: `## *Xylocopa dimidiata*

Especie de abeja carpintero mediana nativa de Centroamérica. Menos conocida que su pariente *X. frontalis*, pero igualmente importante como polinizadora nativa de la región.

### Características
Presenta un patrón de coloración mixto: tórax con pilosidad amarillo-naranja densa y abdomen oscuro con bandas más claras en las primeras metasomas. Su vuelo es igualmente sonoro pero de tono ligeramente diferente.

### Hábitat en el campus
Prefiere los bordes de bosque y las zonas de cafetal bajo sombra. Nidifica en ramas muertas de diámetro medio (2–4 cm). Se le ha observado frecuentemente en floración de *Heliconia* spp. y *Costus* spp.

### Interacciones
A diferencia del Jicote Gato, es un polinizador legítimo de la mayoría de flores que visita, depositando el polen en las partes receptivas florales sin cortar sépalos.`,
    funFact:
      'Esta abeja puede reconocer su propio nido entre docenas de agujeros similares usando señales olfativas y visuales únicas que ella misma deposita en la entrada.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Xylocopa_sp._Bees_-_Nizhoni_Naturalist.jpg/640px-Xylocopa_sp._Bees_-_Nizhoni_Naturalist.jpg',
    dangerLevel: 'Manipular con cuidado',
    conservationStatus: 'Sin evaluación',
    activityPeriod: 'Diurno',
    size: '14–18 mm',
    flightMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    observationCount: 29,
    lastObserved: '2026-04-28',
  },
  {
    id: 'butterfly-001',
    commonName: 'Morpho Azul',
    scientificName: 'Morpho peleides',
    category: 'Mariposas',
    ecologicalRole: 'Polinizador',
    campusLocation: ['Reserva Forestal', 'Sendero Ecológico', 'Jardín de Mariposas'],
    description:
      'Ícono de los bosques tropicales de Centroamérica. Sus alas de color azul iridiscente crean un efecto óptico estructural que no proviene de pigmentos sino de la microestructura de las escamas.',
    detailedInfo: `## Morpho Azul (*Morpho peleides*)

Una de las mariposas más emblemáticas del Neotrópico. El género *Morpho* cuenta con más de 80 especies distribuidas por América tropical.

### La física detrás del azul
El color azul brillante **no es un pigmento**. Es el resultado de la interferencia de la luz en nanoestructuras lamelares de las escamas alares: miles de "árboles" de quitina de 200 nm de ancho reflejan selectivamente las longitudes de onda azul-violeta. Este principio inspira materiales nanoestructurados en industria textil y óptica.

### Ciclo de vida en EARTH
La planta hospedera principal en el campus son varias especies de **Mucuna** (leguminosas) y algunas *Pterocarpus*. La oruga es gregaria en estados tempranos y solitaria al madurar.

### Comportamiento
Son mariposas territoriales. Los machos patrullan rutas fijas a lo largo de bordes de bosque para detectar hembras. El reverso de las alas tiene ocelos (manchas que simulan ojos) para disuadir depredadores.

### Estado de conservación
Aunque actualmente de preocupación menor, el tráfico ilegal para colecciones y la deforestación son amenazas reales en toda su distribución.`,
    funFact:
      'Sus alas pueden verse desde un helicóptero a 100 metros de altura. El efecto óptico cambia completamente de ángulo: de frente es azul brillante, de lado casi desaparece — un sistema de comunicación visual ultra-eficiente.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Morpho_peleides_limpida_MHNT.jpg/640px-Morpho_peleides_limpida_MHNT.jpg',
    dangerLevel: 'Inofensivo',
    conservationStatus: 'Preocupación menor',
    activityPeriod: 'Diurno',
    size: '95–120 mm (envergadura)',
    flightMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    observationCount: 112,
    lastObserved: '2026-05-14',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/56727',
  },
  {
    id: 'beetle-001',
    commonName: 'Escarabajo Rhinoceros / Rinoceronte',
    scientificName: 'Dynastes hercules',
    category: 'Escarabajos',
    ecologicalRole: 'Descomponedor',
    campusLocation: ['Reserva Forestal', 'Área de Compostaje'],
    description:
      'El insecto más grande del mundo por relación fuerza/peso. Clave en la descomposición de madera muerta y reciclaje de nutrientes. Su cuerno es exclusivo de los machos y se usa en combates rituales.',
    detailedInfo: `## Escarabajo Hércules (*Dynastes hercules*)

El *Dynastes hercules* es el escarabajo más largo del mundo, con algunos machos alcanzando 18 cm incluyendo el cuerno. Pertenece a la familia **Scarabaeidae**, subfamilia Dynastinae.

### El cuerno y la selección sexual
Solo los machos desarrollan el cuerno cefalotorácico. No es un arma de depredación, sino una **herramienta de selección sexual**: los machos combaten entre sí sobre troncos para monopolizar el acceso a las hembras. El cuerno más largo casi siempre gana, y el ganador se reproduce. Este es un caso de libro de texto de selección sexual en insectos.

### Rol ecológico en EARTH
Las larvas (que pueden tardar **2–4 años** en desarrollarse) viven dentro de madera en descomposición y son fundamentales en el proceso de **humificación** del suelo de la Reserva Forestal. Sus excrementos enriquecen el sustrato con formas biodisponibles de nitrógeno.

### Color y cambio ambiental
Curiosamente, el élitro del macho cambia de color oliva-amarillo a negro con la humedad — se cree que tiene función termorreguladora.

### Amenazas
El coleccionismo ilegal y la pérdida de bosques maduros con árboles caídos son sus principales amenazas. En EARTH se mantienen árboles muertos de pie como estrategia de conservación.`,
    funFact:
      'Puede cargar 850 veces su propio peso — equivalente a un ser humano levantando 65 toneladas. Es, proporcionalmente, el ser vivo más fuerte del planeta.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/DynastesHerculesMHNT.jpg/640px-DynastesHerculesMHNT.jpg',
    dangerLevel: 'Inofensivo',
    conservationStatus: 'Preocupación menor',
    activityPeriod: 'Nocturno',
    size: '50–180 mm (macho con cuerno)',
    flightMonths: [5, 6, 7, 8, 9, 10],
    observationCount: 18,
    lastObserved: '2026-05-02',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/202449',
  },
  {
    id: 'wasp-001',
    commonName: 'Avispa Pepis / Cazadora de Tarántulas',
    scientificName: 'Pepsis grossa',
    category: 'Avispas',
    ecologicalRole: 'Controlador Biológico',
    campusLocation: ['Reserva Forestal', 'Sendero Ecológico', 'Humedal Sur'],
    description:
      'Una de las avispas más grandes del mundo. Su picadura es la más dolorosa conocida entre insectos. Paraliza tarántulas para provisionar su nido y controla poblaciones de arañas grandes en el bosque.',
    detailedInfo: `## Avispa Cazadora de Tarántulas (*Pepsis grossa*)

Pertenece a la familia **Pompilidae**. Es una de las avispas solitarias más grandes del Neotrópico, con cuerpos que alcanzan 5 cm y alas naranja brillante inconfundibles.

### Ciclo de caza
La hembra busca activamente tarántulas en el suelo. Al encontrar una, provoca un combate, la **paraliza con una picadura precisa** en el ganglio nervioso ventral (sin matarla), la arrastra a una madriguera excavada, deposita un huevo sobre su abdomen vivo, y sella el nido. La larva consume la tarántula viva durante semanas.

### La picadura
El entomólogo Justin Schmidt creó la **Escala de Schmidt** para clasificar el dolor de picaduras de insectos. *Pepsis grossa* recibe **4/4** — la puntuación máxima — descrita como: *"Cegadoramente dramática. Por un momento, el universo se detiene"*. Sin embargo, solo pica en defensa directa.

### Control biológico
Regula poblaciones de tarántulas (*Brachypelma* spp.) y otras arañas grandes en el bosque de EARTH, manteniendo el equilibrio de las redes tróficas del suelo.

### Identificación en campo
Sus alas naranja brillante son una señal de aposematismo honesto — avisan a los depredadores de su capacidad defensiva.`,
    funFact:
      'Su picadura ocupa el puesto número 1 en la Escala de Dolor de Schmidt — pero los efectos duran solo 3–5 minutos y no causa daño tisular duradero. El dolor es puro, sin secuelas.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Pepsis_grossa_wasps_mating_crop.jpg/640px-Pepsis_grossa_wasps_mating_crop.jpg',
    dangerLevel: 'No manipular',
    conservationStatus: 'Sin evaluación',
    activityPeriod: 'Diurno',
    size: '40–55 mm',
    flightMonths: [3, 4, 5, 6, 7, 8, 9],
    observationCount: 9,
    lastObserved: '2026-04-15',
  },
  {
    id: 'dragonfly-001',
    commonName: 'Libélula Roja / Darter Escarlata',
    scientificName: 'Crocothemis servilia',
    category: 'Libélulas',
    ecologicalRole: 'Controlador Biológico',
    campusLocation: ['Humedal Sur', 'Sendero Ecológico'],
    description:
      'Depredadora aérea de altísima eficiencia (95% de tasa de captura). Controla poblaciones de mosquitos y otras plagas en el Humedal Sur del campus. Sus colores intensos indican dominancia territorial.',
    detailedInfo: `## Libélula Roja (*Crocothemis servilia*)

Aunque originaria del Viejo Mundo, esta especie se ha establecido como invasora en América tropical, incluyendo Costa Rica. Pertenece al orden **Odonata**, familia Libellulidae.

### Depredador de élite
Las libélulas son los depredadores más efectivos del reino animal: **capturan el 95% de las presas que persiguen** (comparado con ~25% de los leones). Crocothemis servilia caza en vuelo usando visión de 360° con sus ojos compuestos multifacéticos, calculando trayectorias de intercepción de manera predictiva, no reactiva.

### Metamorfosis incompleta y el humedal
La fase larval (ninfa) es completamente acuática y puede durar de 1 a 3 años en el Humedal Sur. Las ninfas son igualmente depredadoras feroces bajo el agua, controlando larvas de mosquito, renacuajos pequeños y otros macroinvertebrados.

### Indicador ambiental
La presencia de libélulas es un indicador de **buena calidad de agua**. El monitoreo de sus poblaciones en el Humedal Sur forma parte del programa de biomonitoreo del campus.

### Termorregulación
En días calurosos adopta la posición "obelisco": apunta el abdomen directamente al sol para minimizar la superficie expuesta y reducir el sobrecalentamiento — una solución de ingeniería elegante.`,
    funFact:
      'Su cerebro dedica el 80% de su capacidad al procesamiento visual — más que cualquier otro insecto. Puede ver luz ultravioleta y polarizada simultáneamente.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Crocothemis_servilia_%28male%29_-_Kadavoor.jpg/640px-Crocothemis_servilia_%28male%29_-_Kadavoor.jpg',
    dangerLevel: 'Inofensivo',
    conservationStatus: 'Preocupación menor',
    activityPeriod: 'Diurno',
    size: '35–45 mm',
    flightMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    observationCount: 56,
    lastObserved: '2026-05-12',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/107463',
  },
  {
    id: 'bee-004',
    commonName: 'Abeja Orchid / Eulaema',
    scientificName: 'Eulaema meriana',
    category: 'Abejas',
    ecologicalRole: 'Polinizador',
    campusLocation: ['Reserva Forestal', 'Cafetal Agroforestal', 'Arboretum'],
    description:
      'Abeja orquídea de gran tamaño con brillante coloración metálica verde-azul. Los machos colectan fragancias de orquídeas para construir señales químicas de cortejo. Polinizadora especializada de orquídeas y heliconias.',
    detailedInfo: `## Abeja Orquídea Eulaema (*Eulaema meriana*)

Las abejas orquídea (tribu **Eulaini**) son un grupo únicamente neotropical con un comportamiento reproductivo sin equivalente en el mundo animal. *Eulaema meriana* es una de las especies más grandes y llamativas.

### El ritual de las fragancias
Los **machos** visitan flores de orquídeas específicas (y otros tejidos vegetales fragantes) no para recolectar néctar ni polen, sino para absorber compuestos aromáticos con sus patas delanteras especialmente modificadas. Transfieren estos compuestos a órganos en la tibia posterior y construyen una mezcla química personalizada durante semanas.

Esta mezcla única es usada en leks (asambleas de cortejo) para atraer hembras. Las hembras eligen al macho con la fragancia más compleja y diversa — lo que funciona como indicador indirecto de calidad genética y habilidad de exploración del territorio.

### Polinización mutualista
Al recolectar fragancias, el macho transfiere de manera no intencional el **polinario** (masa de polen pegajoso) de las orquídeas a su cuerpo. Las orquídeas **Catasetum**, **Gongora** y **Stanhopea** del campus dependen casi exclusivamente de estas abejas para su reproducción.

### Identificación
Tamaño grande (25–30mm), coloración verde-azul metálica brillante en el tórax, abdomen con bandas más oscuras. Vuelo sonoro y llamativo.`,
    funFact:
      'Los machos pasan semanas "perfumándose" con fragancias de hasta 12 especies de orquídeas diferentes. Sus feromonas de cortejo son únicas, como una huella dactilar química personal.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Eulaema_meriana_-_Eulaema_meriana_-_male_%2810961048083%29.jpg/640px-Eulaema_meriana_-_Eulaema_meriana_-_male_%2810961048083%29.jpg',
    dangerLevel: 'Inofensivo',
    conservationStatus: 'Sin evaluación',
    activityPeriod: 'Diurno',
    size: '25–30 mm',
    flightMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    observationCount: 34,
    lastObserved: '2026-05-08',
    iNaturalistLink: 'https://www.inaturalist.org/taxa/201834',
  },
];

export const ALL_CATEGORIES = [
  'Todas',
  ...Array.from(new Set(insects.map((i) => i.category))),
] as const;

export const ALL_LOCATIONS = [
  'Todas las zonas',
  ...CAMPUS_LOCATIONS,
] as const;
