// HomeSwipe - script.js
// Data, UI, and app logic

const QUESTIONS = [
  // Q1
  {id:1, title:'Climate', left:{title:'SUNNY & WARM YEAR-ROUND',emoji:'☀️🌴',gradient:'linear-gradient(135deg,#FFB347,#FF6B6B)',pros:['No snow to shovel','Great for outdoor lovers','Lower heating bills'],cons:['Can be brutally hot in summer','Less seasonal variety','May miss fall foliage'],tags:['warm_climate','sun_lover','south_or_west','snow_averse']},
    right:{title:'FOUR DISTINCT SEASONS',emoji:'❄️🍂',gradient:'linear-gradient(135deg,#A8D0FF,#EAF6FF)',pros:['Beautiful fall foliage','Cozy winters','Seasonal activities (skiing, etc.)'],cons:['Cold winters','Snow/ice','Higher heating costs'],tags:['four_seasons','cold_tolerant','midwest_or_northeast']}
  },
  // Q2
  {id:2, title:'Coast vs Inland', left:{title:'COASTAL — NEAR THE OCEAN',emoji:'🏖️🌊',gradient:'linear-gradient(135deg,#7FDBFF,#4ECDC4)',pros:['Beach access','Ocean breezes','Seafood culture'],cons:['Hurricane/flood risk','Higher cost','Salt air damage'],tags:['coastal','beach_access','east_coast_or_west_coast']},
    right:{title:'INLAND — AWAY FROM THE COAST',emoji:'🏔️🌲',gradient:'linear-gradient(135deg,#7BBF6A,#6B8E23)',pros:['Lower disaster risk','More affordable','Mountain/lake access'],cons:['No beach','Landlocked feel','Hotter summers'],tags:['inland','mountain_or_plains','midwest_or_south']}
  },
  // Q3
  {id:3, title:'Humidity', left:{title:'DRY CLIMATE, LOW HUMIDITY',emoji:'🏜️☀️',gradient:'linear-gradient(135deg,#E6D4A3,#F2B134)',pros:['Comfortable heat','Less mold','Great for allergies'],cons:['Dry skin','Wildfire risk','Brown landscapes'],tags:['dry_climate','arid','west_or_southwest']},
    right:{title:'HUMID SUMMERS ARE FINE',emoji:'🌿💧',gradient:'linear-gradient(135deg,#C8E6E6,#7FD3B3)',pros:['Lush green landscapes','More water','Rich biodiversity'],cons:['Muggy summers','More bugs','Mold risk'],tags:['humidity_ok','lush_landscape','south_or_east']}
  },
  // Q4
  {id:4, title:'Urban vs Suburban', left:{title:'DENSE, WALKABLE CITY NEIGHBORHOOD',emoji:'🏙️🚶',gradient:'linear-gradient(135deg,#B9B7D1,#8C8ACF)',pros:['Walk to everything','Nightlife','Public transit','Cultural events'],cons:['Noise','Higher cost','Smaller spaces','Less privacy'],tags:['urban','walkable','city_lover','transit_accessible']},
    right:{title:'QUIET, LEAFY SUBURB',emoji:'🌳🏡',gradient:'linear-gradient(135deg,#C8E6C9,#8FD19A)',pros:['More space','Yards','Quieter streets','Good for families'],cons:['Car-dependent','Fewer walkable amenities','Can feel isolated'],tags:['suburban','quiet','family_friendly','car_dependent']}
  },
  // Q5
  {id:5, title:'Suburb type', left:{title:'SUBURB CLOSE TO A MAJOR CITY',emoji:'🚇🏘️',gradient:'linear-gradient(135deg,#4EC0B0,#9DD6C2)',pros:['City access for work/fun','Better resale','Diverse dining'],cons:['Higher taxes','Commuter traffic'],tags:['near_major_city','commuter_suburb','higher_cost']},
    right:{title:'SMALL, SELF-CONTAINED TOWN',emoji:'🏘️🌾',gradient:'linear-gradient(135deg,#C7A96B,#D6B78B)',pros:['Tight-knit community','Lower cost','Local charm'],cons:['Fewer amenities','Limited job market'],tags:['small_town','self_contained','affordable','rural_adjacent']}
  },
  // Q6
  {id:6, title:'Lot size', left:{title:'RURAL / LARGE LOTS & OPEN SPACE',emoji:'🌄🐴',gradient:'linear-gradient(135deg,#6BBF6B,#4FA26A)',pros:['Privacy','Land','Nature','Quiet'],cons:['Long drives','Limited internet','Isolation'],tags:['rural','large_lots','privacy','nature_lover']},
    right:{title:'COMPACT LOTS, MORE NEIGHBORS',emoji:'🏠👋',gradient:'linear-gradient(135deg,#FFB7B2,#FF6B6B)',pros:['Community feel','Walkable','Easier maintenance'],cons:['Less privacy','Noise','Smaller yards'],tags:['compact','community_oriented','walkable','suburban_or_urban']}
  },
  // Q7
  {id:7, title:'Cost tradeoff', left:{title:'LOWER COST, LONGER COMMUTE, FEWER AMENITIES',emoji:'💰🚗',gradient:'linear-gradient(135deg,#9BD67E,#6FA54D)',pros:['More house for the money','Lower taxes','Financial room'],cons:['Hours in the car','Fewer restaurants/shops'],tags:['budget_conscious','commute_tolerant','affordable_area']},
    right:{title:'HIGHER COST, SHORT COMMUTE, MANY AMENITIES',emoji:'☕🚶',gradient:'linear-gradient(135deg,#B892E6,#FF7BA0)',pros:['Walk to coffee shops','Short commute','Vibrant daily life'],cons:['Expensive','Smaller home','Higher taxes'],tags:['amenity_rich','short_commute','higher_cost','urban_or_close_suburb']}
  },
  // Q8
  {id:8, title:'Home size vs quality', left:{title:'SMALLER, NICER HOME',emoji:'✨🏠',gradient:'linear-gradient(135deg,#F6D1C1,#F8B7C1)',pros:['Better finishes','Less maintenance','Higher quality per sqft'],cons:['Less space','Fewer rooms'],tags:['quality_over_quantity','modern_finishes','smaller_footprint']},
    right:{title:'BIGGER, MORE BASIC HOME',emoji:'🏠📐',gradient:'linear-gradient(135deg,#BFD2E6,#91A9C9)',pros:['More rooms','Storage','Yard','Room to grow'],cons:['May need renovations','Higher upkeep'],tags:['space_priority','larger_home','fixer_upper_ok']}
  },
  // Q9
  {id:9, title:'Politics', left:{title:'AREA THAT LEANS PROGRESSIVE / LIBERAL',emoji:'🗳️🔵',gradient:'linear-gradient(135deg,#546AFD,#6EA8FE)',pros:['Diverse perspectives','Social programs','LGBTQ+ friendly'],cons:['Higher taxes','More regulation'],tags:['progressive_area','liberal_leaning','urban_or_coastal']},
    right:{title:'AREA THAT LEANS TRADITIONAL / CONSERVATIVE',emoji:'🗳️🔴',gradient:'linear-gradient(135deg,#F28E8E,#C34A3A)',pros:['Lower taxes','Traditional values','Less regulation'],cons:['Less diversity of viewpoint','Fewer social programs'],tags:['conservative_area','traditional','south_or_rural_or_exurb']}
  },
  // Q10
  {id:10, title:'Political diversity', left:{title:'LOVE POLITICAL DIVERSITY, MIXED VIEWS',emoji:'🤝🗣️',gradient:'linear-gradient(135deg,#C792E8,#9F7CE0)',pros:['Exposure to different ideas','Moderate policies'],cons:['Can feel contentious','Policies swing'],tags:['politically_diverse','moderate_area','swing_region']},
    right:{title:'PREFER MOST PEOPLE SHARE MY OUTLOOK',emoji:'👥✅',gradient:'linear-gradient(135deg,#9CCCA6,#7DBB8E)',pros:['Comfortable','Community alignment','Less friction'],cons:['Echo chamber risk'],tags:['politically_homogeneous','comfort_seeking']}
  },
  // Q11
  {id:11, title:'Religion', left:{title:'STRONG, VISIBLE RELIGIOUS COMMUNITY',emoji:'⛪🕌',gradient:'linear-gradient(135deg,#F2D38A,#E6C06A)',pros:['Built-in community','Shared values','Family events'],cons:['Social pressure','Expectations to participate'],tags:['religious_community','faith_oriented','south_or_midwest_or_utah']},
    right:{title:'MORE SECULAR, RELIGION NOT VERY VISIBLE',emoji:'🌐📚',gradient:'linear-gradient(135deg,#E9EEF3,#D7DEE6)',pros:['Personal freedom','Diverse beliefs'],cons:['Fewer built-in communities'],tags:['secular_area','non_religious','urban_or_coastal_or_pacific_nw']}
  },
  // Q12
  {id:12, title:'Family vs Adult', left:{title:'VERY FAMILY-ORIENTED, LOTS OF KIDS',emoji:'👨‍👩‍👧‍👦🎠',gradient:'linear-gradient(135deg,#F5E59A,#DCE77A)',pros:['Playgrounds','Family events','School focus'],cons:['Everything revolves around kids'],tags:['family_oriented','kid_friendly','good_schools_priority']},
    right:{title:'MORE ADULT-FOCUSED, FEWER KIDS',emoji:'🍷🎶',gradient:'linear-gradient(135deg,#6F6CD3,#4B4BA6)',pros:['Quieter','Nightlife','Adult-focused culture'],cons:['Fewer family resources'],tags:['adult_focused','nightlife','urban_feel']}
  },
  // Q13
  {id:13, title:'Community change', left:{title:'FAST-CHANGING, UP-AND-COMING AREA',emoji:'🚀🏗️',gradient:'linear-gradient(135deg,#C3FF88,#8CF58F)',pros:['Property value growth','New businesses','Energy'],cons:['Construction','Gentrification','Identity in flux'],tags:['up_and_coming','growing_area','investment_potential']},
    right:{title:'STABLE, ESTABLISHED COMMUNITY',emoji:'🏡🌳',gradient:'linear-gradient(135deg,#C78A6B,#A36D4A)',pros:['Predictable','Strong identity','Mature infrastructure'],cons:['Less growth potential','Aging infrastructure'],tags:['established','stable','mature_community']}
  },
  // Q14
  {id:14, title:'Food scene', left:{title:'TONS OF RESTAURANTS, NIGHTLIFE, COFFEE SHOPS',emoji:'🍕☕🍸',gradient:'linear-gradient(135deg,#FF8A65,#FF3D4D)',pros:['Never bored','Endless options','Cultural variety'],cons:['Overspending','Noise','Crowds'],tags:['foodie_area','nightlife','restaurant_variety','urban_or_close_suburb']},
    right:{title:'FEWER OPTIONS BUT QUIETER EVENINGS',emoji:'🏡🌙',gradient:'linear-gradient(135deg,#CAB8E6,#B39FD6)',pros:['Peaceful','Less noise','Lower food costs'],cons:['Limited dining','May feel boring'],tags:['quiet_evenings','suburban_or_rural','low_key']}
  },
  // Q15
  {id:15, title:'Shopping', left:{title:'BIG CHAIN STORES & CONVENIENCE',emoji:'🏬🛒',gradient:'linear-gradient(135deg,#7FB7FF,#90D7FF)',pros:['Everything nearby','Competitive prices','Familiar brands'],cons:['Generic feel','Less local character'],tags:['chain_stores','convenience','suburban_commercial']},
    right:{title:'SMALL LOCAL BUSINESSES & UNIQUE SPOTS',emoji:'🎨🛍️',gradient:'linear-gradient(135deg,#FFB199,#FF9B85)',pros:['Character','Community support','Unique finds'],cons:['Higher prices','Limited hours'],tags:['local_businesses','unique_character','small_town_or_urban_hip']}
  },
  // Q16
  {id:16, title:'Recreation', left:{title:'LOTS OF OUTDOOR RECREATION',emoji:'🥾🛶',gradient:'linear-gradient(135deg,#2E8B57,#1E6F4A)',pros:['Trails','Parks','Lakes','Skiing','Healthy lifestyle'],cons:['Weather-dependent','May lack urban culture'],tags:['outdoor_recreation','nature_access','trails_parks']},
    right:{title:'MORE URBAN CULTURE',emoji:'🎭🖼️',gradient:'linear-gradient(135deg,#6A1B9A,#8E44AD)',pros:['Museums','Theaters','Live music','Galleries'],cons:['Expensive','Crowded','Less green space'],tags:['urban_culture','arts_entertainment','city_amenities']}
  },
  // Q17
  {id:17, title:'School quality', left:{title:'TOP-RATED PUBLIC SCHOOLS, VERY COMPETITIVE',emoji:'🏫🏆',gradient:'linear-gradient(135deg,#223A5E,#8A6C2F)',pros:['Excellent education','College prep','High property values'],cons:['Intense pressure','Very expensive areas'],tags:['top_schools','competitive_academics','high_property_values']},
    right:{title:'DECENT SCHOOLS, LESS INTENSE',emoji:'🏫😊',gradient:'linear-gradient(135deg,#9DD6CC,#7CCAB4)',pros:['Less pressure','Balanced childhood','More affordable'],cons:['May need supplemental education'],tags:['decent_schools','relaxed_academics','moderate_cost']}
  },
  // Q18
  {id:18, title:'Taxes vs Schools', left:{title:'PAY MORE TAXES FOR GREAT SCHOOLS',emoji:'💵🏫',gradient:'linear-gradient(135deg,#A3CF72,#7EB35C)',pros:['Investment in community','Excellent services'],cons:['Higher monthly costs'],tags:['high_tax_ok','school_investment','higher_cost']},
    right:{title:'LOWER TAXES EVEN IF SCHOOLS ARE WEAKER',emoji:'💰📉',gradient:'linear-gradient(135deg,#CFF0B2,#9EDB7E)',pros:['More take-home income','Financial flexibility'],cons:['May need private school'],tags:['low_tax_priority','budget_conscious','private_school_possible']}
  },
  // Q19
  {id:19, title:'Safety', left:{title:'EXTREMELY LOW CRIME IS TOP PRIORITY',emoji:'🔒🛡️',gradient:'linear-gradient(135deg,#6EA1D8,#4B7FB0)',pros:['Peace of mind','Safe for kids','Property protection'],cons:['Often more expensive','Quieter','Less diverse'],tags:['ultra_safe','low_crime_priority','family_safety']},
    right:{title:'OK WITH SLIGHTLY HIGHER CRIME IF MORE LIVELY',emoji:'🌆💡',gradient:'linear-gradient(135deg,#FFBF6B,#FF8A3D)',pros:['More affordable','Livelier','More diverse'],cons:['Need awareness','Some areas to avoid'],tags:['crime_tolerant','urban_energy','affordable','lively']}
  },
  // Q20
  {id:20, title:'Noise', left:{title:'VERY QUIET AT NIGHT',emoji:'🌙🤫',gradient:'linear-gradient(135deg,#0F3057,#2A4365)',pros:['Better sleep','Peaceful','Nature sounds'],cons:['Can feel isolated','Nothing open late'],tags:['quiet_nights','peaceful','suburban_or_rural']},
    right:{title:'OK WITH CITY NOISE / STREET ACTIVITY',emoji:'🌃🔊',gradient:'linear-gradient(135deg,#FF7F50,#FF6B6B)',pros:['Feels alive','Safe through activity'],cons:['Sleep disruption','Noise pollution'],tags:['noise_tolerant','city_energy','urban']}
  },
  // Q21
  {id:21, title:'Transportation', left:{title:'CAR-DEPENDENT, FINE DRIVING EVERYWHERE',emoji:'🚗🛣️',gradient:'linear-gradient(135deg,#6D6E71,#525659)',pros:['Freedom','Flexibility','Can live farther out'],cons:['Gas costs','Traffic','Parking'],tags:['car_dependent','driving_ok','suburban_or_rural']},
    right:{title:'WALKABLE / TRANSIT-ACCESSIBLE',emoji:'🚇🚶',gradient:'linear-gradient(135deg,#65C3B7,#38A39D)',pros:['No car needed','Exercise built in'],cons:['Limited to transit routes','Crowded'],tags:['walkable','transit_accessible','urban','northeast_or_west_coast']}
  },
  // Q22
  {id:22, title:'Airport', left:{title:'NEAR A MAJOR AIRPORT IS IMPORTANT',emoji:'✈️🌍',gradient:'linear-gradient(135deg,#9DD7FF,#5AA9FF)',pros:['Easy travel','Business connectivity'],cons:['Airplane noise','Traffic','Expensive areas'],tags:['airport_access','travel_friendly','major_metro_adjacent']},
    right:{title:'DISTANCE TO AIRPORT DOESN\'T MATTER',emoji:'🏡✌️',gradient:'linear-gradient(135deg,#C7E7CD,#9FD4B1)',pros:['Quieter','More options'],cons:['Long drive when you fly'],tags:['airport_not_important','flexible_location']}
  },
  // Q23
  {id:23, title:'Housing style', left:{title:'NEWER CONSTRUCTION, MODERN FINISHES',emoji:'🏗️✨',gradient:'linear-gradient(135deg,#F5F7FA,#E8EEF8)',pros:['Energy efficient','Open floor plans','Smart home ready'],cons:['Cookie-cutter','Less character'],tags:['new_construction','modern','energy_efficient']},
    right:{title:'OLDER / HISTORIC HOMES WITH CHARACTER',emoji:'🏚️🕰️',gradient:'linear-gradient(135deg,#D8A86F,#A36A3A)',pros:['Unique architecture','Craftsmanship','Charm'],cons:['Maintenance costs','Outdated systems'],tags:['historic_homes','character','established_neighborhood']}
  },
  // Q24
  {id:24, title:'HOA', left:{title:'HOA WITH RULES AND UNIFORM LOOK',emoji:'📋🏘️',gradient:'linear-gradient(135deg,#D8ECFF,#B9DFFF)',pros:['Maintained property values','Clean areas'],cons:['Monthly fees','Strict rules'],tags:['hoa_ok','uniform_neighborhood','newer_development']},
    right:{title:'NO HOA, MORE INDIVIDUALITY',emoji:'🎨🏡',gradient:'linear-gradient(135deg,#F6C5E0,#F7A6D1)',pros:['Freedom','No fees','No board politics'],cons:['Neighbors may not maintain property'],tags:['no_hoa','individual_freedom','established_or_rural']}
  },
  // Q25
  {id:25, title:'Diversity', left:{title:'VERY DIVERSE, MULTICULTURAL AREA',emoji:'🌍🤝',gradient:'linear-gradient(135deg,#FFD27F,#FF9AA2)',pros:['Cultural richness','Diverse food and events'],cons:['Can feel less cohesive'],tags:['diverse','multicultural','urban_or_coastal']},
    right:{title:'MORE HOMOGENEOUS, TIGHT-KNIT COMMUNITY',emoji:'🏘️👥',gradient:'linear-gradient(135deg,#E2C3A3,#CDAA86)',pros:['Strong shared identity','Close bonds'],cons:['Less exposure to other cultures'],tags:['homogeneous','tight_knit','small_town_or_suburb']}
  },
  // Q26
  {id:26, title:'Property taxes', left:{title:'OK WITH HIGH PROPERTY TAXES FOR BETTER SERVICES',emoji:'💰🏛️',gradient:'linear-gradient(135deg,#D4C96F,#BFA34A)',pros:['Better schools','Roads','Parks','Services'],cons:['Significantly higher monthly costs'],tags:['high_tax_ok','good_services','northeast_or_illinois']},
    right:{title:'LOW PROPERTY TAXES ARE IMPORTANT',emoji:'💵✅',gradient:'linear-gradient(135deg,#DFF7D7,#AEE6B6)',pros:['Lower costs','More money in pocket'],cons:['Fewer public services'],tags:['low_tax_priority','south_or_west','budget_conscious']}
  },
  // Q27
  {id:27, title:'Natural disaster risk', left:{title:'MINIMAL NATURAL DISASTER RISK',emoji:'🛡️🌤️',gradient:'linear-gradient(135deg,#BEE1F7,#8FC8F4)',pros:['Peace of mind','Lower insurance'],cons:['Limits location options'],tags:['low_disaster_risk','midwest_or_northeast_inland']},
    right:{title:'ACCEPT SOME RISK FOR A GREAT LOCATION',emoji:'🌊🌅',gradient:'linear-gradient(135deg,#FFB88C,#FF7E6B)',pros:['Often more beautiful','Coastal or mountain'],cons:['Insurance costs','Evacuation risk'],tags:['disaster_risk_ok','coastal_or_wildfire_zone','beauty_priority']}
  },
  // Q28
  {id:28, title:'Yard', left:{title:'BIG YARD IS A MUST',emoji:'🌿🐕',gradient:'linear-gradient(135deg,#6CC07F,#4FA05D)',pros:['Kids/pets play','Gardening','Privacy'],cons:['Maintenance','Usually suburban/rural'],tags:['big_yard','outdoor_space','suburban_or_rural']},
    right:{title:'DON\'T NEED MUCH OUTDOOR SPACE',emoji:'🏙️🪴',gradient:'linear-gradient(135deg,#EDEDED,#BFBFBF)',pros:['Less maintenance','More urban options'],cons:['No private outdoor space'],tags:['low_maintenance','urban_ok','compact_living']}
  },
  // Q29
  {id:29, title:'Pet friendliness', left:{title:'PET-FRIENDLY AREA IS ESSENTIAL',emoji:'🐕🐈',gradient:'linear-gradient(135deg,#FFD6A5,#FFB085)',pros:['Dog parks','Pet businesses','Vet access'],cons:['May limit housing (breed restrictions)'],tags:['pet_friendly','dog_parks','suburban_or_family_area']},
    right:{title:'PETS AREN\'T A FACTOR',emoji:'🤷‍♂️',gradient:'linear-gradient(135deg,#D3D3D3,#BEBEBE)',pros:['More housing options'],cons:[],tags:['no_pet_needs']}
  },
  // Q30
  {id:30, title:'Commute', left:{title:"I'LL COMMUTE BY CAR DAILY",emoji:'🚗⏰',gradient:'linear-gradient(135deg,#8B8A8A,#6F6F6F)',pros:['Flexibility','Suburban living options'],cons:['Traffic','Gas','Stress'],tags:['car_commuter','suburban_ok','highway_access']},
    right:{title:'I WORK REMOTE / NO COMMUTE',emoji:'🏠💻',gradient:'linear-gradient(135deg,#FFD8B1,#FFB78A)',pros:['Live anywhere','No traffic stress'],cons:['Need good internet','Home office space'],tags:['remote_worker','location_flexible','internet_priority']}
  },
  // Q31 REMOVED (internet question removed per spec)
  // Q32
  {id:32, title:'Healthcare', left:{title:'PROXIMITY TO TOP HOSPITALS IS IMPORTANT',emoji:'🏥⭐',gradient:'linear-gradient(135deg,#DDEEFE,#B8D9FF)',pros:['Specialist access','Emergency care','Research hospitals'],cons:['Usually near a city','Higher cost'],tags:['healthcare_priority','major_metro_adjacent','hospital_access']},
    right:{title:'STANDARD HEALTHCARE IS FINE',emoji:'🏥✅',gradient:'linear-gradient(135deg,#CDEAD0,#99D4A8)',pros:['More location flexibility'],cons:['May travel for specialists'],tags:['standard_healthcare','flexible_location']}
  },
  // Q33
  {id:33, title:'Walkability to errands', left:{title:'WALK TO GROCERY STORE AND DAILY ERRANDS',emoji:'🚶🛒',gradient:'linear-gradient(135deg,#E7F7C7,#CFF19A)',pros:['Healthier','Save gas','Community interaction'],cons:['Limited to denser areas'],tags:['walkable_errands','urban_or_dense_suburb','walkable']},
    right:{title:'FINE DRIVING TO ERRANDS',emoji:'🚗🏪',gradient:'linear-gradient(135deg,#D6D6D6,#BFBFBF)',pros:['Bigger stores','More parking','Bulk shopping'],cons:['Car dependency'],tags:['drive_to_errands','suburban_or_rural','car_dependent']}
  },
  // Q34
  {id:34, title:'Nightlife', left:{title:'ACTIVE NIGHTLIFE MATTERS',emoji:'🎉🍹',gradient:'linear-gradient(135deg,#FF6BA6,#D63AA6)',pros:['Socializing','Entertainment','Live music'],cons:['Noise','Safety at night'],tags:['nightlife','social_scene','urban']},
    right:{title:'NIGHTLIFE ISN\'T IMPORTANT',emoji:'🌙📖',gradient:'linear-gradient(135deg,#486B94,#2F4868)',pros:['Quieter','Family-friendly evenings'],cons:['May feel boring for younger buyers'],tags:['no_nightlife_need','family_oriented','suburban_or_rural']}
  },
  // Q35
  {id:35, title:'Sports', left:{title:'NEAR PRO SPORTS TEAMS AND VENUES',emoji:'🏟️⚽',gradient:'linear-gradient(135deg,#6FB3FF,#4A8AED)',pros:['Game days','Community energy','Entertainment'],cons:['Traffic on game days','Higher costs'],tags:['sports_access','major_metro','entertainment']},
    right:{title:'DON\'T CARE ABOUT PRO SPORTS PROXIMITY',emoji:'🤷‍♂️',gradient:'linear-gradient(135deg,#D6D6D6,#BFBFBF)',pros:['More location flexibility'],cons:[],tags:['sports_not_priority','flexible_location']}
  },
  // Q36
  {id:36, title:'Food diversity', left:{title:'INCREDIBLE FOOD DIVERSITY FROM AROUND THE WORLD',emoji:'🍣🌮🥘',gradient:'linear-gradient(135deg,#FF6B6B,#FF9A6B)',pros:['Authentic cuisines','Food festivals','Food trucks'],cons:['Usually only in diverse metros','Pricey'],tags:['food_diversity','multicultural','urban_or_diverse_suburb']},
    right:{title:'AMERICAN CLASSICS AND LOCAL FAVORITES',emoji:'🍔🥧',gradient:'linear-gradient(135deg,#F4C06B,#E89C3A)',pros:['Comfort food','Local identity','Affordable'],cons:['Less variety'],tags:['american_food','local_cuisine','small_town_or_suburb']}
  },
  // Q37
  {id:37, title:'Gardening', left:{title:'I WANT TO GARDEN AND GROW THINGS',emoji:'🌻🥕',gradient:'linear-gradient(135deg,#6BBF7B,#3E8D5A)',pros:['Fresh food','Relaxation','Beautiful yard'],cons:['Requires yard space','Time','Good climate'],tags:['gardening','yard_space','suburban_or_rural','temperate_climate']},
    right:{title:'NOT INTO GARDENING',emoji:'🏢✌️',gradient:'linear-gradient(135deg,#BFBFBF,#999999)',pros:['No yard work','More urban options'],cons:[],tags:['no_gardening','urban_ok','compact_living']}
  },
  // Q38
  {id:38, title:'Snow', left:{title:'I LOVE SNOW AND WINTER ACTIVITIES',emoji:'⛷️☃️',gradient:'linear-gradient(135deg,#EAF6FF,#CFEAFF)',pros:['Skiing','Snowboarding','Cozy vibes','Holiday magic'],cons:['Shoveling','Driving hazards'],tags:['snow_lover','winter_activities','northeast_or_mountain_or_midwest']},
    right:{title:'AVOID SNOW ENTIRELY',emoji:'☀️🌺',gradient:'linear-gradient(135deg,#FFD19A,#FFB3A7)',pros:['No shoveling','Safe driving','Year-round outdoor activities'],cons:['Miss winter sports','Extreme heat'],tags:['snow_averse','warm_climate','south_or_southwest_or_coastal_ca']}
  },
  // Q39
  {id:39, title:'State income tax', left:{title:"I DON'T MIND STATE INCOME TAX",emoji:'📋💰',gradient:'linear-gradient(135deg,#8FB3D9,#6A95C1)',pros:['Often better services','Infrastructure','Schools'],cons:['Lower take-home pay'],tags:['income_tax_ok','northeast_or_california_or_midwest']},
    right:{title:'NO STATE INCOME TAX IS A BIG PLUS',emoji:'💵🎉',gradient:'linear-gradient(135deg,#9EEB86,#5FD16A)',pros:['More take-home pay','Financial advantage'],cons:['Higher sales or property tax','Fewer services'],tags:['no_income_tax','texas_florida_washington_nevada_tennessee_wyoming_sd_nh_ak']}
  },
  // Q40
  {id:40, title:'Overall vibe', left:{title:'BIG, IMPORTANT, WORLD-CLASS PLACE',emoji:'🌆🏙️',gradient:'linear-gradient(135deg,#6D5DF6,#4B3BFF)',pros:['Career opportunities','World-class amenities','Diversity'],cons:['Cost','Crowds','Stress'],tags:['major_metro','urban','ambitious','career_focused']},
    right:{title:'PEACEFUL, SLOWER-PACED LIVING',emoji:'🌅🏡',gradient:'linear-gradient(135deg,#C7E89F,#8FC97A)',pros:['Less stress','Community feel','Nature','Affordability'],cons:['Fewer career options','Less excitement'],tags:['slow_pace','peaceful','small_town_or_suburb','nature_access']}
  }
];

// --- LOCATION LIST & GENERATOR ---
// Config: toggle listing behavior. Set `enableListings` to `true` to use
// the built-in generated list. You can also provide a `realListingsUrl`
// (e.g. data/listings.json) and implement a fetch to replace the generated
// data later. Default here is to disable listings to remove placeholder
// listings from the prototype.
const CONFIG = {
  enableListings: true, // enable generated locations (listings UI removed separately)
  realListingsUrl: '/data/listings.json' // optional hook for real listings
};

<<<<<<< HEAD
// Primary locations list will be populated from an external build producing
// `data/locations/us_locations.json` (produced by `bin/build_us_locations.sh`).
// Fall back to an empty list so the app can still run in degraded mode.
let mandatory = [];
=======
// We'll include all mandatory locations explicitly in a compact mapping, then generate more names to reach 300+.

const mandatory = [
  // ALABAMA
  {name:'Birmingham',state:'AL',region:'southeast'},{name:'Huntsville',state:'AL',region:'southeast'},{name:'Mountain Brook',state:'AL',region:'southeast'},{name:'Fairhope',state:'AL',region:'southeast'},
  // ALASKA
  {name:'Anchorage',state:'AK',region:'mountain_west'},{name:'Juneau',state:'AK',region:'mountain_west'},{name:'Sitka',state:'AK',region:'mountain_west'},{name:'Wasilla',state:'AK',region:'mountain_west'},
  // ARIZONA
  {name:'Phoenix',state:'AZ',region:'southwest'},{name:'Scottsdale',state:'AZ',region:'southwest'},{name:'Tucson',state:'AZ',region:'southwest'},{name:'Sedona',state:'AZ',region:'southwest'},{name:'Flagstaff',state:'AZ',region:'southwest'},{name:'Gilbert',state:'AZ',region:'southwest'},
  // ARKANSAS
  {name:'Little Rock',state:'AR',region:'southeast'},{name:'Fayetteville',state:'AR',region:'southeast'},{name:'Bentonville',state:'AR',region:'southeast'},{name:'Hot Springs',state:'AR',region:'southeast'},
  // CALIFORNIA (12)
  {name:'San Francisco',state:'CA',region:'west'},{name:'Los Angeles',state:'CA',region:'west'},{name:'San Diego',state:'CA',region:'west'},{name:'Sacramento',state:'CA',region:'west'},{name:'Santa Barbara',state:'CA',region:'west'},{name:'San Luis Obispo',state:'CA',region:'west'},{name:'Palo Alto',state:'CA',region:'west'},{name:'Irvine',state:'CA',region:'west'},{name:'Pasadena',state:'CA',region:'west'},{name:'Berkeley',state:'CA',region:'west'},{name:'Carlsbad',state:'CA',region:'west'},{name:'Napa',state:'CA',region:'west'},
  // COLORADO
  {name:'Denver',state:'CO',region:'mountain_west'},{name:'Boulder',state:'CO',region:'mountain_west'},{name:'Colorado Springs',state:'CO',region:'mountain_west'},{name:'Fort Collins',state:'CO',region:'mountain_west'},{name:'Aspen',state:'CO',region:'mountain_west'},{name:'Durango',state:'CO',region:'mountain_west'},
  // CONNECTICUT
  {name:'Greenwich',state:'CT',region:'northeast'},{name:'Westport',state:'CT',region:'northeast'},{name:'New Haven',state:'CT',region:'northeast'},{name:'Hartford',state:'CT',region:'northeast'},{name:'Stamford',state:'CT',region:'northeast'},
  // DELAWARE
  {name:'Wilmington',state:'DE',region:'northeast'},{name:'Rehoboth Beach',state:'DE',region:'northeast'},{name:'Newark',state:'DE',region:'northeast'},{name:'Dover',state:'DE',region:'northeast'},
  // FLORIDA (10)
  {name:'Miami',state:'FL',region:'southeast'},{name:'Tampa',state:'FL',region:'southeast'},{name:'Orlando',state:'FL',region:'southeast'},{name:'Jacksonville',state:'FL',region:'southeast'},{name:'Sarasota',state:'FL',region:'southeast'},{name:'Naples',state:'FL',region:'southeast'},{name:'St. Augustine',state:'FL',region:'southeast'},{name:'Key West',state:'FL',region:'southeast'},{name:'Winter Park',state:'FL',region:'southeast'},{name:'Coral Gables',state:'FL',region:'southeast'},
  // GEORGIA
  {name:'Atlanta',state:'GA',region:'southeast'},{name:'Savannah',state:'GA',region:'southeast'},{name:'Athens',state:'GA',region:'southeast'},{name:'Decatur',state:'GA',region:'southeast'},{name:'Roswell',state:'GA',region:'southeast'},{name:'Augusta',state:'GA',region:'southeast'},
  // HAWAII
  {name:'Honolulu',state:'HI',region:'pacific_northwest'},{name:'Kailua',state:'HI',region:'pacific_northwest'},{name:'Lahaina',state:'HI',region:'pacific_northwest'},{name:'Hilo',state:'HI',region:'pacific_northwest'},
  // IDAHO
  {name:'Boise',state:'ID',region:'mountain_west'},{name:'Coeur d\'Alene',state:'ID',region:'mountain_west'},{name:'Sun Valley',state:'ID',region:'mountain_west'},{name:'Moscow',state:'ID',region:'mountain_west'},
  // ILLINOIS (8)
  {name:'Chicago',state:'IL',region:'midwest'},{name:'Naperville',state:'IL',region:'midwest'},{name:'Evanston',state:'IL',region:'midwest'},{name:'Oak Park',state:'IL',region:'midwest'},{name:'Springfield',state:'IL',region:'midwest'},{name:'Champaign',state:'IL',region:'midwest'},{name:'Lake Forest',state:'IL',region:'midwest'},{name:'Galena',state:'IL',region:'midwest'},
  // INDIANA
  {name:'Indianapolis',state:'IN',region:'midwest'},{name:'Carmel',state:'IN',region:'midwest'},{name:'Bloomington',state:'IN',region:'midwest'},{name:'Fort Wayne',state:'IN',region:'midwest'},{name:'Zionsville',state:'IN',region:'midwest'},
  // IOWA
  {name:'Des Moines',state:'IA',region:'midwest'},{name:'Iowa City',state:'IA',region:'midwest'},{name:'Cedar Rapids',state:'IA',region:'midwest'},{name:'Ames',state:'IA',region:'midwest'},
  // KANSAS
  {name:'Kansas City (KS)',state:'KS',region:'midwest'},{name:'Overland Park',state:'KS',region:'midwest'},{name:'Lawrence',state:'KS',region:'midwest'},{name:'Wichita',state:'KS',region:'midwest'},
  // KENTUCKY
  {name:'Louisville',state:'KY',region:'southeast'},{name:'Lexington',state:'KY',region:'southeast'},{name:'Bowling Green',state:'KY',region:'southeast'},{name:'Berea',state:'KY',region:'southeast'},
  // LOUISIANA
  {name:'New Orleans',state:'LA',region:'southeast'},{name:'Baton Rouge',state:'LA',region:'southeast'},{name:'Lafayette',state:'LA',region:'southeast'},{name:'Shreveport',state:'LA',region:'southeast'},{name:'Covington',state:'LA',region:'southeast'},
  // MAINE
  {name:'Portland',state:'ME',region:'northeast'},{name:'Bar Harbor',state:'ME',region:'northeast'},{name:'Camden',state:'ME',region:'northeast'},{name:'Kennebunkport',state:'ME',region:'northeast'},
  // MARYLAND
  {name:'Baltimore',state:'MD',region:'northeast'},{name:'Bethesda',state:'MD',region:'northeast'},{name:'Annapolis',state:'MD',region:'northeast'},{name:'Columbia',state:'MD',region:'northeast'},{name:'Frederick',state:'MD',region:'northeast'},{name:'Ocean City',state:'MD',region:'northeast'},
  // MASSACHUSETTS
  {name:'Boston',state:'MA',region:'northeast'},{name:'Cambridge',state:'MA',region:'northeast'},{name:'Brookline',state:'MA',region:'northeast'},{name:'Northampton',state:'MA',region:'northeast'},{name:'Lexington (MA)',state:'MA',region:'northeast'},{name:'Worcester',state:'MA',region:'northeast'},
  // MICHIGAN
  {name:'Ann Arbor',state:'MI',region:'midwest'},{name:'Grand Rapids',state:'MI',region:'midwest'},{name:'Traverse City',state:'MI',region:'midwest'},{name:'Detroit',state:'MI',region:'midwest'},{name:'Royal Oak',state:'MI',region:'midwest'},{name:'Holland',state:'MI',region:'midwest'},
  // MINNESOTA
  {name:'Minneapolis',state:'MN',region:'midwest'},{name:'St. Paul',state:'MN',region:'midwest'},{name:'Edina',state:'MN',region:'midwest'},{name:'Rochester',state:'MN',region:'midwest'},{name:'Duluth',state:'MN',region:'midwest'},
  // MISSISSIPPI
  {name:'Oxford',state:'MS',region:'southeast'},{name:'Hattiesburg',state:'MS',region:'southeast'},{name:'Ridgeland',state:'MS',region:'southeast'},{name:'Ocean Springs',state:'MS',region:'southeast'},
  // MISSOURI
  {name:'Kansas City (MO)',state:'MO',region:'midwest'},{name:'St. Louis',state:'MO',region:'midwest'},{name:'Columbia (MO)',state:'MO',region:'midwest'},{name:'Springfield (MO)',state:'MO',region:'midwest'},{name:'Clayton',state:'MO',region:'midwest'},
  // MONTANA
  {name:'Bozeman',state:'MT',region:'mountain_west'},{name:'Missoula',state:'MT',region:'mountain_west'},{name:'Helena',state:'MT',region:'mountain_west'},{name:'Whitefish',state:'MT',region:'mountain_west'},
  // NEBRASKA
  {name:'Omaha',state:'NE',region:'midwest'},{name:'Lincoln',state:'NE',region:'midwest'},{name:'Grand Island',state:'NE',region:'midwest'},{name:'Kearney',state:'NE',region:'midwest'},
  // NEVADA
  {name:'Las Vegas',state:'NV',region:'west'},{name:'Reno',state:'NV',region:'west'},{name:'Henderson',state:'NV',region:'west'},{name:'Summerlin',state:'NV',region:'west'},
  // NEW HAMPSHIRE
  {name:'Concord',state:'NH',region:'northeast'},{name:'Portsmouth',state:'NH',region:'northeast'},{name:'Hanover',state:'NH',region:'northeast'},{name:'Nashua',state:'NH',region:'northeast'},
  // NEW JERSEY (8)
  {name:'Westfield',state:'NJ',region:'northeast'},{name:'Hoboken',state:'NJ',region:'northeast'},{name:'Princeton',state:'NJ',region:'northeast'},{name:'Montclair',state:'NJ',region:'northeast'},{name:'Summit',state:'NJ',region:'northeast'},{name:'Morristown',state:'NJ',region:'northeast'},{name:'Cape May',state:'NJ',region:'northeast'},{name:'Red Bank',state:'NJ',region:'northeast'},
  // NEW MEXICO
  {name:'Santa Fe',state:'NM',region:'southwest'},{name:'Albuquerque',state:'NM',region:'southwest'},{name:'Las Cruces',state:'NM',region:'southwest'},{name:'Taos',state:'NM',region:'southwest'},
  // NEW YORK (10)
  {name:'New York City',state:'NY',region:'northeast'},{name:'Chappaqua',state:'NY',region:'northeast'},{name:'Scarsdale',state:'NY',region:'northeast'},{name:'Ithaca',state:'NY',region:'northeast'},{name:'Saratoga Springs',state:'NY',region:'northeast'},{name:'Buffalo',state:'NY',region:'northeast'},{name:'Rochester (NY)',state:'NY',region:'northeast'},{name:'Bronxville',state:'NY',region:'northeast'},{name:'Woodstock',state:'NY',region:'northeast'},{name:'Sag Harbor',state:'NY',region:'northeast'},
  // NORTH CAROLINA
  {name:'Charlotte',state:'NC',region:'southeast'},{name:'Raleigh-Durham',state:'NC',region:'southeast'},{name:'Asheville',state:'NC',region:'southeast'},{name:'Chapel Hill',state:'NC',region:'southeast'},{name:'Wilmington (NC)',state:'NC',region:'southeast'},{name:'Greenville (NC)',state:'NC',region:'southeast'},
  // NORTH DAKOTA
  {name:'Fargo',state:'ND',region:'midwest'},{name:'Bismarck',state:'ND',region:'midwest'},{name:'Grand Forks',state:'ND',region:'midwest'},{name:'Minot',state:'ND',region:'midwest'},
  // OHIO
  {name:'Columbus',state:'OH',region:'midwest'},{name:'Cleveland',state:'OH',region:'midwest'},{name:'Cincinnati',state:'OH',region:'midwest'},{name:'Shaker Heights',state:'OH',region:'midwest'},{name:'Yellow Springs',state:'OH',region:'midwest'},{name:'Hudson (OH)',state:'OH',region:'midwest'},
  // OKLAHOMA
  {name:'Oklahoma City',state:'OK',region:'southwest'},{name:'Tulsa',state:'OK',region:'southwest'},{name:'Norman',state:'OK',region:'southwest'},{name:'Edmond',state:'OK',region:'southwest'},
  // OREGON
  {name:'Portland (OR)',state:'OR',region:'pacific_northwest'},{name:'Bend',state:'OR',region:'pacific_northwest'},{name:'Eugene',state:'OR',region:'pacific_northwest'},{name:'Ashland',state:'OR',region:'pacific_northwest'},{name:'Hood River',state:'OR',region:'pacific_northwest'},
  // PENNSYLVANIA
  {name:'Philadelphia',state:'PA',region:'northeast'},{name:'Pittsburgh',state:'PA',region:'northeast'},{name:'State College',state:'PA',region:'northeast'},{name:'Lancaster',state:'PA',region:'northeast'},{name:'Media',state:'PA',region:'northeast'},{name:'Doylestown',state:'PA',region:'northeast'},
  // RHODE ISLAND
  {name:'Providence',state:'RI',region:'northeast'},{name:'Newport',state:'RI',region:'northeast'},{name:'Narragansett',state:'RI',region:'northeast'},{name:'Barrington',state:'RI',region:'northeast'},
  // SOUTH CAROLINA
  {name:'Charleston',state:'SC',region:'southeast'},{name:'Greenville (SC)',state:'SC',region:'southeast'},{name:'Hilton Head',state:'SC',region:'southeast'},{name:'Clemson',state:'SC',region:'southeast'},{name:'Beaufort',state:'SC',region:'southeast'},
  // SOUTH DAKOTA
  {name:'Sioux Falls',state:'SD',region:'midwest'},{name:'Rapid City',state:'SD',region:'midwest'},{name:'Deadwood',state:'SD',region:'midwest'},{name:'Brookings',state:'SD',region:'midwest'},
  // TENNESSEE
  {name:'Nashville',state:'TN',region:'southeast'},{name:'Franklin (TN)',state:'TN',region:'southeast'},{name:'Chattanooga',state:'TN',region:'southeast'},{name:'Knoxville',state:'TN',region:'southeast'},{name:'Memphis',state:'TN',region:'southeast'},
  // TEXAS (10)
  {name:'Austin',state:'TX',region:'southwest'},{name:'Dallas',state:'TX',region:'southwest'},{name:'Houston',state:'TX',region:'southwest'},{name:'San Antonio',state:'TX',region:'southwest'},{name:'Fort Worth',state:'TX',region:'southwest'},{name:'Plano',state:'TX',region:'southwest'},{name:'Fredericksburg',state:'TX',region:'southwest'},{name:'Marfa',state:'TX',region:'southwest'},{name:'The Woodlands',state:'TX',region:'southwest'},{name:'McKinney',state:'TX',region:'southwest'},
  // UTAH
  {name:'Salt Lake City',state:'UT',region:'mountain_west'},{name:'Park City',state:'UT',region:'mountain_west'},{name:'Provo',state:'UT',region:'mountain_west'},{name:'St. George',state:'UT',region:'mountain_west'},{name:'Moab',state:'UT',region:'mountain_west'},
  // VERMONT
  {name:'Burlington',state:'VT',region:'northeast'},{name:'Stowe',state:'VT',region:'northeast'},{name:'Woodstock (VT)',state:'VT',region:'northeast'},{name:'Montpelier',state:'VT',region:'northeast'},
  // VIRGINIA
  {name:'Alexandria',state:'VA',region:'northeast'},{name:'Richmond',state:'VA',region:'northeast'},{name:'Charlottesville',state:'VA',region:'northeast'},{name:'Arlington (VA)',state:'VA',region:'northeast'},{name:'Virginia Beach',state:'VA',region:'northeast'},{name:'Roanoke',state:'VA',region:'northeast'},
  // WASHINGTON
  {name:'Seattle',state:'WA',region:'pacific_northwest'},{name:'Bellevue',state:'WA',region:'pacific_northwest'},{name:'Tacoma',state:'WA',region:'pacific_northwest'},{name:'Olympia',state:'WA',region:'pacific_northwest'},{name:'Spokane',state:'WA',region:'pacific_northwest'},{name:'Leavenworth',state:'WA',region:'pacific_northwest'},
  // WEST VIRGINIA
  {name:'Charleston (WV)',state:'WV',region:'southeast'},{name:'Shepherdstown',state:'WV',region:'southeast'},{name:'Lewisburg',state:'WV',region:'southeast'},{name:'Morgantown',state:'WV',region:'southeast'},
  // WISCONSIN
  {name:'Madison',state:'WI',region:'midwest'},{name:'Milwaukee',state:'WI',region:'midwest'},{name:'Door County',state:'WI',region:'midwest'},{name:'Cedarburg',state:'WI',region:'midwest'},{name:'Green Bay',state:'WI',region:'midwest'},
  // WYOMING
  {name:'Jackson',state:'WY',region:'mountain_west'},{name:'Cody',state:'WY',region:'mountain_west'},{name:'Sheridan',state:'WY',region:'mountain_west'},{name:'Laramie',state:'WY',region:'mountain_west'},
  // Washington D.C.
  {name:'Washington, DC',state:'DC',region:'northeast'}
];
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1

// Additional city lists (short) to reach 300+ when expanded
const extras = {
  AL:['Mobile','Tuscaloosa','Auburn'],
  AK:['Kodiak','Ketchikan','Nome'],
  AZ:['Mesa','Chandler','Glendale','Yuma'],
  AR:['Jonesboro','Conway','Hot Springs Village'],
  CA:['Oakland','Santa Monica','Palm Springs','Malibu','Davis','Santa Cruz','Irvine Ranch'],
  CO:['Vail','Glenwood Springs','Steamboat Springs'],
  CT:['Branford','Mystic'],
  DE:['Lewes'],
  FL:['St. Petersburg','Fort Lauderdale','Key Largo','Boca Raton','Gainesville'],
  GA:['Marietta','Savannah Suburbs'],
  HI:['Kihei','Waimea'],
  ID:['Idaho Falls','Lewiston'],
  IL:['Aurora','Joliet','Skokie','Elmhurst'],
  IN:['South Bend','Muncie'],
  IA:['Davenport','Waterloo'],
  KS:['Topeka','Manhattan'],
  KY:['Paducah','Somerset'],
  LA:['Mandeville','Slidell'],
  ME:['Kittery','Ellsworth'],
  MD:['Ocean Pines'],
  MA:['Salem','Hingham'],
  MI:['Kalamazoo','Saugatuck'],
  MN:['Mankato','Stillwater'],
  MS:['Gulfport'],
  MO:['Jefferson City'],
  MT:['Kalispell','Big Sky'],
  NE:['Bellevue'],
  NV:['Carson City'],
  NH:['Keene'],
  NJ:['Asbury Park','Haddonfield'],
  NM:['Ruidoso'],
  NY:['Albany','Poughkeepsie','Yonkers'],
  NC:['Wilmington Suburbs'],
  ND:['Williston'],
  OH:['Toledo','Athens (OH)'],
  OK:['Broken Arrow'],
  OR:['Newport','Seaside'],
  PA:['Harrisburg','Erie'],
  RI:['Westerly'],
  SC:['Mount Pleasant','Myrtle Beach'],
  SD:['Aberdeen'],
  TN:['Johnson City'],
  TX:['Galveston','Bryan','Georgetown','Round Rock'],
  UT:['Heber City'],
  VT:['Bennington'],
  VA:['Norfolk','Hampton'],
  WA:['Bellingham','Anacortes'],
  WV:['Beckley'],
  WI:['Eau Claire'],
  WY:['Gillette']
};

const REGIONS_MAP = {
  'AL':'southeast','AK':'mountain_west','AZ':'southwest','AR':'southeast','CA':'west','CO':'mountain_west','CT':'northeast','DE':'northeast','FL':'southeast','GA':'southeast','HI':'pacific_northwest','ID':'mountain_west','IL':'midwest','IN':'midwest','IA':'midwest','KS':'midwest','KY':'southeast','LA':'southeast','ME':'northeast','MD':'northeast','MA':'northeast','MI':'midwest','MN':'midwest','MS':'southeast','MO':'midwest','MT':'mountain_west','NE':'midwest','NV':'west','NH':'northeast','NJ':'northeast','NM':'southwest','NY':'northeast','NC':'southeast','ND':'midwest','OH':'midwest','OK':'southwest','OR':'pacific_northwest','PA':'northeast','RI':'northeast','SC':'southeast','SD':'midwest','TN':'southeast','TX':'southwest','UT':'mountain_west','VT':'northeast','VA':'northeast','WA':'pacific_northwest','WV':'southeast','WI':'midwest','WY':'mountain_west','DC':'northeast'
};

function priceToNumber(priceStr){
  // priceStr like "$549k" or "$1.2M"
  if(!priceStr) return 500000;
  let s = priceStr.replace(/[$,]/g,'').toLowerCase();
  if(s.endsWith('k')) return Math.round(parseFloat(s.replace('k',''))*1000);
  if(s.endsWith('m')) return Math.round(parseFloat(s.replace('m',''))*1000000);
  return Math.round(parseFloat(s));
}

function formatPrice(num){
  if(num >= 1000000) return '$' + (Math.round(num/100000)/10) + 'M';
  return '$' + Math.round(num/1000) + 'k';
}

function randSeed(name){
  let h=0; for(let i=0;i<name.length;i++) h=(h<<5)-h+name.charCodeAt(i); return Math.abs(h);
}

function enrich(name,state,region){
  const seed = randSeed(name+state);
  const tags = new Set();
  // region-based tags
  if(region==='northeast'){tags.add('northeast');tags.add('four_seasons');}
  if(region==='southeast'){tags.add('southeast');tags.add('humidity_ok');}
  if(region==='midwest'){tags.add('midwest');tags.add('four_seasons');}
  if(region==='southwest'){tags.add('southwest');tags.add('dry_climate');}
  if(region==='west'){tags.add('west');tags.add('coastal');}
  if(region==='pacific_northwest'){tags.add('pacific_northwest');tags.add('lush_landscape');}
  if(region==='mountain_west'){tags.add('mountain_west');tags.add('outdoor_recreation');}

  // heuristics by name
  const lname = name.toLowerCase();
  if(lname.includes('beach')||lname.includes('key')||lname.includes('harbor')||lname.includes('port')||lname.includes('cape')) tags.add('beach_access');
  if(lname.includes('spring')||lname.includes('falls')||lname.includes('lake')) tags.add('nature_access');
  if(lname.includes('university')||lname.includes('college')||lname.includes('state')||lname.includes('town')) tags.add('university_town');
  if(lname.includes('park')||lname.includes('forest')||lname.includes('ridge')) tags.add('outdoor_recreation');

  // size and vibe
  if(name.match(/city|new york|los angeles|chicago|houston|phoenix|philadelphia|san francisco|seattle|miami|boston|atlanta|dallas/i)) tags.add('major_metro');
  if(name.match(/town|village|beaufort|kennebunkport|galena|bar harbor|sedona|marfa|carmel|napa|santa barbara|kennebunk/i)) tags.add('small_town');

  // economy and culture guesses
  if(region==='west' || region==='pacific_northwest') tags.add('food_diversity');
  if(region==='northeast' || region==='midwest') tags.add('good_schools_priority');
  if(region==='southwest' || region==='southeast') tags.add('low_tax_priority');

  // random-ish tags to reach variety
  const possible = ['walkable','transit_accessible','suburban','compact','car_dependent','affordable','amenity_rich','diverse','historic_homes','new_construction','pet_friendly','gardening','fast_internet','hospital_access','sports_access','nightlife','local_businesses','wine_country','craft_beer','resort_feel','no_hoa','hoa_ok','quiet_evenings','up_and_coming','established'];
  for(let i=0;i<6;i++){
    const pick = possible[(seed>>i) % possible.length]; tags.add(pick);
  }

  // ensure tags array length 15-25 by adding general tags
  const core = ['sun_lover','snow_averse','four_seasons','warm_climate','cold_tolerant','dry_climate','humidity_ok','temperate_climate','coastal','inland','family_oriented','adult_focused','diverse','homogeneous','walkable_errands','drive_to_errands','fast_internet','low_disaster_risk'];
  let idx=0; while(tags.size<15){ tags.add(core[(seed+idx)%core.length]); idx++; }
  // convert to array
  const tagsArr = Array.from(tags).slice(0,22);

  // derive price by region and city size
  let base = 300000;
  if(tagsArr.includes('major_metro')) base = 650000;
  if(region==='west' || region==='pacific_northwest') base *= 1.3;
  if(region==='northeast') base *= 1.2;
  if(name.match(/Napa|Santa Barbara|Palo Alto|San Francisco|Manhattan|Scarsdale|Bronxville/i)) base *= 2.2;
  // tweak by seed
  base = Math.round(base * (0.8 + ((seed % 40)/100)));

  const medianHomePrice = formatPrice(base);
  // property tax level heuristic
  let propertyTaxLevel = 'Moderate';
  if(['northeast','midwest'].includes(region)) propertyTaxLevel = 'High';
  if(region==='southwest' || region==='southeast') propertyTaxLevel = 'Low';
  if(name.match(/San Francisco|New York City|Boston|Los Angeles|Napa|Beverly|Greenwich/)) propertyTaxLevel = 'Very High';

  // school rating
  const schoolRating = tagsArr.includes('university_town') || tagsArr.includes('good_schools_priority') ? 'Excellent' : (seed%5<3?'Good':'Average');

  // safety
  const safetyLevel = (seed%10>6)?'Moderate':'Moderate-High';

  // vibe and highlights
  const vibe = `${name} is known for its ${tagsArr.includes('food_diversity')? 'diverse food scene' : tagsArr.includes('outdoor_recreation')? 'outdoor access' : 'distinct local character'}.`;
  const highlights = [];
  highlights.push(tagsArr.includes('food_diversity')?'Rich international food scene':'Local restaurants and cafes');
  highlights.push(tagsArr.includes('outdoor_recreation')?'Proximity to trails and parks':'Community events and small businesses');
  highlights.push(tagsArr.includes('university_town')?'Active college-town energy':'Strong neighborhood character');

  const population = (base>700000)?'~1,000,000+':'~'+(Math.max(5,Math.round(base/50))*1000).toLocaleString();

  return {
    name, state, region,
    tags: tagsArr,
    medianHomePrice,
    propertyTaxLevel: propertyTaxLevel==='Very High'?'Very High':(propertyTaxLevel==='High'?'High':'Moderate'),
    schoolRating,
    safetyLevel,
    vibe,
    highlights,
    population
  };
}

// Build locations list (may be disabled via CONFIG.enableListings)
let LOCATIONS = [];
<<<<<<< HEAD

async function initLocations(){
  if(!CONFIG.enableListings){
    console.log('Listings disabled by CONFIG; LOCATIONS is empty');
    return;
  }

  // Attempt to load prebuilt locations JSON produced by bin/build_us_locations.sh
  try{
    const resp = await fetch('/data/locations/us_locations.json');
    if(resp.ok){
      const data = await resp.json();
      if(Array.isArray(data) && data.length>0){
        // Map external entries into the minimal shape used below
        mandatory = data.map(d=>({name:d.name, state:d.state||'', region: d.region || REGIONS_MAP[(d.state||'').toUpperCase()] || 'midwest'}));
        console.log('Loaded', mandatory.length, 'locations from data/locations/us_locations.json');
      }
    }
  }catch(err){
    console.warn('Could not load external locations:', err);
  }

  // If mandatory still empty, warn but continue (app has fallback heuristics elsewhere)
  if(mandatory.length === 0) console.warn('No external mandatory locations found; LOCATIONS may be limited.');

  // populate LOCATIONS using `enrich` to add tags/estimates
=======
if(CONFIG.enableListings){
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  for(const it of mandatory){
    const region = it.region || REGIONS_MAP[it.state] || 'midwest';
    LOCATIONS.push(enrich(it.name,it.state,region));
  }

<<<<<<< HEAD
  // add extras (small curated list) to increase coverage
=======
  // add extras
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  for(const st in extras){
    const arr = extras[st];
    for(const nm of arr){
      LOCATIONS.push(enrich(nm,st,REGIONS_MAP[st]||'midwest'));
    }
  }

<<<<<<< HEAD
  // synthetic filler names to ensure variety
  const fillerNames = [
    'Lincoln','Riverton','Fairview','Centerville','Oak Grove','Maplewood','Riverside','Highland','Clearwater','Springfield','Summit','Cedar Grove','Pleasantville',' Meadowbrook','Willow Creek','Sunnyside','Edgewater','Rosewood','Hillside','Silver Lake'
  ];
=======
  // add synthetic extra names from states until >=600 (more potential places)
  const fillerNames = [
    'Lincoln','Riverton','Fairview','Centerville','Oak Grove','Maplewood','Riverside','Highland','Clearwater','Springfield','Summit','Cedar Grove','Pleasantville',' Meadowbrook','Willow Creek','Sunnyside','Edgewater','Rosewood','Hillside','Silver Lake'
  ];
  // iterate states to fill
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  const states = Object.keys(REGIONS_MAP);
  let si=0; while(LOCATIONS.length<600){
    const state = states[si % states.length];
    const name = fillerNames[(si) % fillerNames.length] + ' ' + state;
    LOCATIONS.push(enrich(name,state,REGIONS_MAP[state]));
    si++;
  }

<<<<<<< HEAD
  if(LOCATIONS.length < 300) console.warn('locations less than 300', LOCATIONS.length);

  // initialize scores now that LOCATIONS exists
  resetScores();
}

// Kick off location initialization (runs asynchronously in browser)
initLocations();

=======
  // ensure at least 300
  if(LOCATIONS.length < 300) console.warn('locations less than 300', LOCATIONS.length);
} else {
  console.log('Listings disabled by CONFIG; LOCATIONS is empty');
}

>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
// --- App state ---
const state = {
  onboarding: {budget:null,homeType:[],timeline:null,mustHaves:''},
  answers: [],
<<<<<<< HEAD
  answerTitles: [],
  scores: {},
  currentQ: 0,
  saved: JSON.parse(localStorage.getItem('homeswipe_saved')||'[]'),
  job: { jobLocation: '', commuteMax: 30, commuteMode: 'car', preferredRegion: '', preferredStates: [] }
=======
  scores: {},
  currentQ: 0,
  saved: JSON.parse(localStorage.getItem('homeswipe_saved')||'[]')
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
};

// init scores
function resetScores(){ LOCATIONS.forEach(loc=> state.scores[loc.name+'|'+loc.state]=0); }
resetScores();

// --- UI helpers ---
function qs(sel,el=document) { return el.querySelector(sel); }
function qsa(sel,el=document) { return Array.from(el.querySelectorAll(sel)); }

function showScreen(id){ qsa('.screen').forEach(s=>s.classList.remove('active')); qs(id).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }

// Landing -> Occupation (new flow)
qs('#start-btn').addEventListener('click',()=>{ showScreen('#screen-occupation'); });

<<<<<<< HEAD
// Occupation (job location) handlers
qs('#commute-max').addEventListener('input', e=>{ qs('#commute-val').textContent = e.target.value; state.job.commuteMax = parseInt(e.target.value,10); });
qs('#occupation-continue').addEventListener('click', e=>{ e.preventDefault();
  state.job.jobLocation = (qs('#occupation-input').value || '').trim();
  state.job.preferredRegion = qs('#preferred-region').value || '';
  state.job.preferredStates = (qs('#preferred-states').value||'').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
  state.job.commuteMode = qs('#commute-mode') ? qs('#commute-mode').value : 'car';
  state.currentQuestions = QUESTIONS; // keep main quiz; job occupation no longer requested
=======
// Occupation handlers
state.job = { occupation: '', commuteMax: 30, preferredRegion: '', preferredStates: [] };
qs('#commute-max').addEventListener('input', e=>{ qs('#commute-val').textContent = e.target.value; state.job.commuteMax = parseInt(e.target.value,10); });
qs('#occupation-continue').addEventListener('click', e=>{ e.preventDefault(); state.job.occupation = qs('#occupation-input').value || ''; state.job.preferredRegion = qs('#preferred-region').value || ''; state.job.preferredStates = (qs('#preferred-states').value||'').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
  // ask whether to take a short job-specific 15-question quiz
  if(confirm('Take a short 15-question job-specific quiz now? (You can skip)')){
    state.currentQuestions = buildJobQuestions(state.job.occupation);
  } else {
    state.currentQuestions = QUESTIONS;
  }
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  startQuiz();
});

qs('#occupation-skip').addEventListener('click', e=>{ e.preventDefault(); state.currentQuestions = QUESTIONS; startQuiz(); });

function buildJobQuestions(occupation){
  // Simple heuristic: prioritize commute/transport/healthcare/work-related questions
  const kws = (occupation||'').toLowerCase();
  const priorityTags = [];
  if(kws.match(/engineer|developer|software|tech/)) priorityTags.push('fast_internet','transit_accessible','major_metro','amenity_rich');
  if(kws.match(/nurse|doctor|health|hospital|medical/)) priorityTags.push('hospital_access','healthcare_priority','quiet_nights');
  if(kws.match(/teacher|professor|education/)) priorityTags.push('good_schools_priority','university_town');
  if(kws.match(/remote|remote worker|work from home/)) priorityTags.push('remote_worker','fast_internet');
  // pick up to 15 questions that match priorityTags first, then fill with other important questions
  const picked = [];
  for(const q of QUESTIONS){ if(picked.length>=15) break; const tset = q.left.tags.concat(q.right.tags); if(priorityTags.some(pt=> tset.includes(pt))){ picked.push(q); }}
  for(const q of QUESTIONS){ if(picked.length>=15) break; if(!picked.includes(q)) picked.push(q); }
  return picked.slice(0,15);
}

// Onboarding pills
qsa('.pills').forEach(pwrap=>{
  const multi = pwrap.dataset.multi === 'true';
  pwrap.addEventListener('click',e=>{
    if(e.target.matches('.pill')){
      const val = e.target.dataset.value;
      const name = pwrap.dataset.name;
      if(multi){ e.target.classList.toggle('selected');
        const sels = qsa('.pill.selected',pwrap).map(b=>b.dataset.value);
        state.onboarding[name]=sels;
      } else {
        qsa('.pill',pwrap).forEach(b=>b.classList.remove('selected'));
        e.target.classList.add('selected');
        state.onboarding[name]=val;
      }
    }
  });
});

qs('#must-haves').addEventListener('input',e=> state.onboarding.mustHaves = e.target.value);

qs('#skip-onboard').addEventListener('click',e=>{ e.preventDefault(); startQuiz(); });
qs('#onboard-go').addEventListener('click',e=>{ e.preventDefault(); startQuiz(); });

function startQuiz(){
  // persist onboarding
  localStorage.setItem('homeswipe_onboard', JSON.stringify(state.onboarding));
  state.currentQ = 0; state.answers = []; resetScores();
<<<<<<< HEAD
  state.answerTitles = [];
=======
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  // ensure we have a questions set
  if(!state.currentQuestions) state.currentQuestions = QUESTIONS;
  showQuestion(0);
  showScreen('#screen-quiz');
}

// Show question index
function showQuestion(idx){
  state.currentQ = idx;
  const qset = state.currentQuestions || QUESTIONS;
  const q = qset[idx];
  if(!q) return finishQuiz();
  qs('#progress-text').textContent = `Question ${idx+1} of ${qset.length}`;
  const prog = Math.round(((idx)/qset.length)*100);
  qs('#progress-bar').style.width = prog+'%';

  const area = qs('#cards-area'); area.innerHTML='';
  const left = makeCard(q.left,'left');
  const right = makeCard(q.right,'right');
  area.appendChild(left); area.appendChild(right);

  // hook buttons
  left.querySelector('.choose-btn').addEventListener('click',()=>chooseOption(q.left));
  right.querySelector('.choose-btn').addEventListener('click',()=>chooseOption(q.right));
}

function makeCard(side,which){
  const card = document.createElement('div'); card.className='card';
  const header = document.createElement('div'); header.className='card-header';
  const emoji = document.createElement('div'); emoji.className='card-emoji'; emoji.textContent=side.emoji;
  const title = document.createElement('div'); title.className='card-title'; title.textContent=side.title;
  header.appendChild(emoji); header.appendChild(title);
<<<<<<< HEAD
  // apply gradient header from the question data for a cleaner look
  if(side.gradient) { header.style.background = side.gradient; header.style.color = '#fff'; header.style.padding = '12px'; header.style.borderRadius = '12px'; }
=======
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  card.appendChild(header);
  const pros = document.createElement('div'); pros.className='card-pros';
  side.pros.forEach(p=>{ const el = document.createElement('div'); el.innerHTML=`<span class="dot-pro">•</span> ${p}`; pros.appendChild(el); });
  card.appendChild(pros);
  const cons = document.createElement('div'); cons.className='card-cons';
  side.cons.forEach(c=>{ const el = document.createElement('div'); el.innerHTML=`<span class="dot-con">•</span> ${c}`; cons.appendChild(el); });
  card.appendChild(cons);
  const btn = document.createElement('button'); btn.className='choose-btn '+(which==='left'?'choose-left':'choose-right'); btn.textContent='Choose This';
  card.appendChild(btn);
  return card;
}

function chooseOption(option){
  // animate (simplified)
  // record answer tags
  state.answers.push(option.tags);
<<<<<<< HEAD
  state.answerTitles.push(option.title);
=======
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  // scoring: +3 per exact tag
  for(const t of option.tags){
    for(const loc of LOCATIONS){
      if(loc.tags.includes(t)) state.scores[loc.name+'|'+loc.state] += 3;
      // region match: if tag implies region name, add +1
      const regionHints = {northeast:['northeast','midwest_or_northeast'],'midwest':['midwest_or_northeast'],'southeast':['south_or_east','south_or_west'],'west':['west','east_coast_or_west_coast'],'pacific_northwest':['pacific_northwest'],'mountain_west':['mountain_west'] };
      for(const r in regionHints){ if(regionHints[r].some(h=> option.tags.includes(h)) && loc.region===r) state.scores[loc.name+'|'+loc.state] +=1; }
    }
  }

  // move next
  const qset = state.currentQuestions || QUESTIONS;
  const next = state.currentQ+1;
  // interim hints after Q8,16,24,32,40 (i.e., after indexes 7,15,23,31,39)
  const hintIndexes = [8,16,24,32,40].filter(i=> i <= qset.length);
  if(hintIndexes.includes(next)){
    showHintOverlay(next);
  } else {
    showQuestion(next);
  }
}

function showHintOverlay(nextIndex){
  // compute top inferred tags
  const tagCounts = {};
  for(const ans of state.answers){ for(const t of ans){ tagCounts[t]=(tagCounts[t]||0)+1; }}
  const topTags = Object.keys(tagCounts).sort((a,b)=>tagCounts[b]-tagCounts[a]).slice(0,4);
  qs('#hint-chips').innerHTML = topTags.map(t=>`<span class="chip">${t.replace(/_/g,' ')}</span>`).join('');
  // region by score
  const regionScore = {}; for(const key in state.scores){ const [name,st]=key.split('|'); const loc = LOCATIONS.find(l=>l.name===name && l.state===st); if(!loc) continue; regionScore[loc.region]=(regionScore[loc.region]||0)+state.scores[key]; }
  const topRegion = Object.keys(regionScore).sort((a,b)=>regionScore[b]-regionScore[a])[0]||'national';
  qs('#hint-region').textContent = `You're leaning toward: ${formatRegionName(topRegion)}`;
  if(nextIndex>=16){ // show possible states top 2-3
    const stateScore = {};
    for(const key in state.scores){ const [name,st]=key.split('|'); stateScore[st]=(stateScore[st]||0)+state.scores[key]; }
    const topStates = Object.keys(stateScore).sort((a,b)=>stateScore[b]-stateScore[a]).slice(0,3);
    qs('#hint-states').textContent = `Possible states for you: ${topStates.join(', ')}`;
  } else qs('#hint-states').textContent='';
  qs('#hint-overlay').classList.remove('hidden');
}

qs('#hint-continue').addEventListener('click',()=>{ qs('#hint-overlay').classList.add('hidden'); showQuestion(state.currentQ+1); });

function formatRegionName(r){
  if(r==='northeast') return 'Northeast';
  if(r==='southeast') return 'Southeast';
  if(r==='midwest') return 'Midwest';
  if(r==='southwest') return 'Southwest';
  if(r==='west') return 'West Coast';
  if(r==='pacific_northwest') return 'Pacific Northwest';
  if(r==='mountain_west') return 'Mountain West';
  return r;
}

// Skip and Back
qs('#skip-btn').addEventListener('click',e=>{ e.preventDefault(); const qset = state.currentQuestions || QUESTIONS; const next = state.currentQ+1; const hintIndexes = [8,16,24,32,40].filter(i=> i <= qset.length); if(hintIndexes.includes(next)) showHintOverlay(next); else showQuestion(next); });
qs('#back-btn').addEventListener('click',e=>{ e.preventDefault(); if(state.answers.length>0){ state.answers.pop(); // TODO ideally remove score contributions (not implemented: simplified approach)
<<<<<<< HEAD
  state.answerTitles.pop();
=======
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  // we will recompute scores from scratch from answers
  resetScores(); for(const ans of state.answers){ for(const t of ans){ for(const loc of LOCATIONS){ if(loc.tags.includes(t)) state.scores[loc.name+'|'+loc.state]+=3; } }}
 }
 showQuestion(Math.max(0,state.currentQ-1)); });

// Exit quiz
qs('#exit-quiz').addEventListener('click',e=>{ e.preventDefault(); if(confirm('Exit quiz and return to landing? Progress will be saved.')){ showScreen('#screen-landing'); } });

// Finish quiz
<<<<<<< HEAD
async function finishQuiz(){
=======
function finishQuiz(){
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  // Scoring: for each location, count how many answered questions
  // have at least one tag that matches the location. Then score is
  // (matches / total questions in quiz) rounded to nearest percent.
  const qset = state.currentQuestions || QUESTIONS;
  const totalQuestions = qset.length || 1;
  // apply preferred region/state filters if provided
  let pool = LOCATIONS.slice();
<<<<<<< HEAD
  // if user provided a job location, try to narrow by commute distance
  function findJobLocation(input){
    if(!input) return null;
    const raw = input.trim();
    const cityOnly = raw.split(',')[0].trim().toLowerCase();
    // exact or starts-with match
    let match = LOCATIONS.find(l=> l.name.toLowerCase() === raw.toLowerCase() || l.name.toLowerCase() === cityOnly);
    if(match) return match;
    // if user entered a state code like 'WA' or full state name, try state code
    const maybeCode = raw.toUpperCase();
    if(REGIONS_MAP[maybeCode]) return { name: null, state: maybeCode, region: REGIONS_MAP[maybeCode] };
    return null;
  }

  function estimateCommuteMiles(jobLoc, loc, mode){
    // simple heuristic distances (miles)
    if(!jobLoc) return 9999;
    let base = 400;
    if(jobLoc.name && loc.name && jobLoc.name.toLowerCase() === loc.name.toLowerCase() && jobLoc.state === loc.state) base = 5;
    else if(jobLoc.state && jobLoc.state === loc.state) base = 40;
    else if(jobLoc.region && jobLoc.region === loc.region) base = 120;
    else base = 400;
    // mode adjustments
    if(mode === 'transit') base = Math.round(base * 0.6);
    if(mode === 'bike') base = Math.round(base * 0.35);
    return base;
  }

  const jobLocInput = state.job && state.job.jobLocation ? state.job.jobLocation : '';
  const jobLoc = findJobLocation(jobLocInput);
  if(jobLoc){
    // if we matched a state-only entry, filter by same state
    if(jobLoc.name === null && jobLoc.state){
      pool = pool.filter(l=> l.state === jobLoc.state || state.job.commuteMax >= 200);
    } else if(jobLoc.name){
      pool = pool.filter(l=> estimateCommuteMiles(jobLoc, l, state.job.commuteMode) <= (state.job.commuteMax || 9999));
    }
    // if pool becomes empty, fallback to full LOCATIONS to avoid empty results
    if(pool.length === 0) pool = LOCATIONS.slice();
  }
=======
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  if(state.job){
    if(state.job.preferredRegion){ pool = pool.filter(l=> l.region === state.job.preferredRegion); }
    if(state.job.preferredStates && state.job.preferredStates.length){ pool = pool.filter(l=> state.job.preferredStates.includes(l.state)); }
  }
  const ranked = pool.map(loc=>{
    let matches = 0;
    for(let i=0;i<qset.length;i++){
      const ansTags = state.answers[i] || [];
      if(ansTags.some(t=> loc.tags.includes(t))) matches++;
    }
    const score = Math.round((matches / totalQuestions) * 100);
    return { loc, matches, score };
  });
  ranked.sort((a,b)=> b.score - a.score || b.matches - a.matches);
  state.ranked = ranked.map(r=>({k: r.loc.name+'|'+r.loc.state, raw: r.matches, score: r.score}));
  state.top10 = ranked.slice(0,10).map(r=> ({...r.loc, score: r.score }));
<<<<<<< HEAD

  // If user provided a job location, attempt geocoding to compute real distances
  if(state.job && state.job.jobLocation){
    try{
      const jobQuery = state.job.jobLocation;
      const jobCoords = await geocodeWithCache(jobQuery);
      if(jobCoords){
        // show overlay and progress
        qs('#geocode-progress').textContent = 'Preparing geocoding...';
        qs('#geocode-overlay').classList.remove('hidden');
        // limit how many locations to geocode to avoid rate limits
        const limit = Math.min(200, ranked.length);
        const candidates = ranked.slice(0, limit);
        // geocode each candidate sequentially (throttle) and compute distance
        for(let i=0;i<candidates.length;i++){
          const item = candidates[i];
          const loc = item.loc;
          qs('#geocode-progress').textContent = `Resolving ${i+1} of ${candidates.length}: ${loc.name}, ${loc.state}`;
          const q = `${loc.name}, ${loc.state}, USA`;
          const coords = await geocodeWithCache(q);
          if(coords){ loc.lat = parseFloat(coords.lat); loc.lon = parseFloat(coords.lon); item.distance = haversine(jobCoords.lat, jobCoords.lon, loc.lat, loc.lon); }
          // throttle: respect Nominatim best practice ~1s/request
          await sleep(1100);
        }

        // compute allowed miles based on commute mode
        const modeMultiplier = { car: 1.0, transit: 1.5, bike: 0.5 };
        const allowed = (state.job.commuteMax || 30) * (modeMultiplier[state.job.commuteMode] || 1);

        // filter and boost scores by proximity
        const withDist = candidates.filter(c=> typeof c.distance === 'number');
        const nearby = withDist.filter(c=> c.distance <= Math.max(allowed, 1));
        if(nearby.length){
          // apply proximity bonus and re-sort
          nearby.forEach(c=>{ const bonus = Math.max(0, Math.round((1 - (c.distance/allowed)) * 30)); c.score = c.score + bonus; });
          nearby.sort((a,b)=> b.score - a.score || a.distance - b.distance);
          // replace top10 with nearest high-scoring
          state.top10 = nearby.slice(0,10).map(c=> ({...c.loc, score: c.score, distance: Math.round(c.distance) }));
        } else {
          // no nearby geocoded matches: keep earlier top10 but annotate distances when available
          state.top10 = ranked.slice(0,10).map(r=> ({...r.loc, score: r.score }));
        }
      }
    }catch(err){ console.warn('Geocoding failed or was throttled', err); }
    qs('#geocode-overlay').classList.add('hidden');
  }

  showResults();
}

// --- Geocoding helpers ---
function sleep(ms){ return new Promise(res=>setTimeout(res,ms)); }

function loadGeocodeCache(){ try{ return JSON.parse(localStorage.getItem('homeswipe_geocode_cache')||'{}'); }catch(e){ return {}; } }
function saveGeocodeCache(c){ try{ localStorage.setItem('homeswipe_geocode_cache', JSON.stringify(c)); }catch(e){} }

async function geocodeWithCache(query){
  if(!query) return null;
  const key = query.toLowerCase().trim();
  const cache = loadGeocodeCache();
  if(cache[key]) return cache[key];
  try{
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&addressdetails=0`;
    const res = await fetch(url);
    if(!res.ok) return null;
    const j = await res.json();
    if(j && j.length){ cache[key] = { lat: j[0].lat, lon: j[0].lon }; saveGeocodeCache(cache); return cache[key]; }
  }catch(e){ console.warn('geocode error', e); }
  return null;
}

function haversine(lat1, lon1, lat2, lon2){
  if(!lat1||!lon1||!lat2||!lon2) return 99999;
  const toRad = v=> v * Math.PI / 180;
  const R = 3958.8; // miles
  const dLat = toRad(lat2-lat1); const dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2)) * Math.sin(dLon/2)*Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Try OSRM routing (local) for real route distance. Returns miles or null.
async function osrmRouteDistance(lat1, lon1, lat2, lon2){
  if(!lat1||!lon1||!lat2||!lon2) return null;
  const hosts = ['http://localhost:5000','http://localhost:5001'];
  for(const host of hosts){
    try{
      const url = `${host}/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false&alternatives=false&steps=false`;
      const res = await fetch(url, {cache:'no-store'});
      if(!res.ok) continue;
      const j = await res.json();
      if(j && j.routes && j.routes[0] && typeof j.routes[0].distance === 'number'){
        const meters = j.routes[0].distance; // meters
        const miles = meters / 1609.344;
        return miles;
      }
    }catch(e){ /* ignore and try next host */ }
  }
  return null;
}

function showResults(){
  showScreen('#screen-results');
  const grid = qs('#results-grid'); grid.innerHTML='';
  // show quick summary of user's selected answers
  const answersSection = document.createElement('div'); answersSection.innerHTML = `<h3>Your Selected Answers</h3>`;
  const answersHtml = state.answerTitles && state.answerTitles.length ? state.answerTitles.map((t,i)=>`<div class="answer-summary"><strong>Q${i+1}:</strong> ${t}</div>`).join('') : '<div class="small-muted">No answers recorded.</div>';
  answersSection.innerHTML += answersHtml;
  grid.appendChild(answersSection);

  // show commute note if present
  if(state.job && state.job.jobLocation){
    const note = document.createElement('div'); note.style.marginTop='8px'; note.style.color='#444'; note.innerHTML = `<small>Showing places within <strong>${state.job.commuteMax} miles</strong> of <strong>${state.job.jobLocation}</strong> using <strong>${state.job.commuteMode}</strong> commute assumptions.</small>`;
    grid.appendChild(note);
  }
=======
  showResults();
}

function showResults(){
  showScreen('#screen-results');
  const grid = qs('#results-grid'); grid.innerHTML='';
>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
  // Matched (score > 0)
  const matched = state.top10;
  const matchedSection = document.createElement('div'); matchedSection.innerHTML = `<h3>Your Top Matches</h3>`;
  matched.forEach((loc,i)=>{
    const card = document.createElement('div'); card.className='result-card';
    card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><div class="rank">#${i+1} ${loc.name}, ${loc.state}</div><div style="color:#666;margin-top:6px">Population: ${loc.population} • <small>${loc.region}</small></div></div><div><div class="match-badge">Match: ${loc.score}/100</div><div style="margin-top:8px"> <small class="region-badge">${loc.region}</small></div></div></div><div style="margin-top:12px">${loc.highlights.slice(0,3).map(t=>`<span class="tag-chip">${t}</span>`).join('')}</div><div style="margin-top:12px"><button class="cta small view-details" data-name="${loc.name}" data-state="${loc.state}">View Details →</button></div>`;
    matchedSection.appendChild(card);
  });
  grid.appendChild(matchedSection);

  // Not matched (score === 0) - show a short list of examples
  const notMatched = state.ranked.filter(r=> r.score === 0).slice(0,10);
  if(notMatched.length){
    const nmSection = document.createElement('div'); nmSection.innerHTML = `<h3>Places you didn't match</h3>`;
    nmSection.innerHTML += notMatched.map(r=>{ const [name,st]=r.k.split('|'); return `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f1f1"><div>${name}, ${st}</div><div>${r.score}/100</div></div>`; }).join('');
    grid.appendChild(nmSection);
  }

  // attach view details handlers for matched cards
  qsa('.view-details').forEach(btn=> btn.addEventListener('click',e=>{
    const name = btn.dataset.name; const st = btn.dataset.state; const loc = LOCATIONS.find(l=>l.name===name && l.state===st); openDetails(loc);
  }));
}

function openDetails(loc){
  // Render details without showing current listing placeholders
  qs('#details-content').innerHTML = `<h2>${loc.name}, ${loc.state} <span class="match-badge">Population: ${loc.population}</span></h2><p>${loc.vibe}</p><h3>Why this place fits you</h3><ul>${loc.tags.slice(0,6).map(t=>`<li>You chose ${t.replace(/_/g,' ')} and ${loc.name} has ${t.replace(/_/g,' ')} features.</li>`).join('')}</ul><h3>Possible tradeoffs</h3><ul><li>Some local differences may exist compared to your choices.</li></ul><h3>Data Snapshot</h3><div>Median home price: ${loc.medianHomePrice} • Property tax: ${loc.propertyTaxLevel} • Schools: ${loc.schoolRating} • Safety: ${loc.safetyLevel}</div><h3>Highlights</h3><ul>${loc.highlights.map(h=>`<li>${h}</li>`).join('')}</ul><div style="margin-top:12px"><button id="save-place" class="cta small">Save This Place ❤️</button></div>`;
  qs('#details-modal').classList.remove('hidden');
  qs('#save-place')?.addEventListener('click',()=>{ savePlace(loc); });
}

qs('#details-close').addEventListener('click',()=>{ qs('#details-modal').classList.add('hidden'); showScreen('#screen-results'); });

function savePlace(loc){
  const key = loc.name+','+loc.state; if(!state.saved.includes(key)){ state.saved.push(key); localStorage.setItem('homeswipe_saved', JSON.stringify(state.saved)); alert('Saved!'); }
}

qs('#saved-link').addEventListener('click',e=>{ e.preventDefault(); openSaved(); });
function openSaved(){ qs('#saved-panel').classList.remove('hidden'); const list = qs('#saved-list'); list.innerHTML = state.saved.length? state.saved.map(k=>`<div style="padding:8px 0;border-bottom:1px solid #f1f1f1">${k}</div>`).join('') : '<div>No saved places yet</div>'; }
qs('#saved-close').addEventListener('click',()=> qs('#saved-panel').classList.add('hidden'));

qs('#retake-btn').addEventListener('click',()=>{ if(confirm('Retake the quiz?')){ resetScores(); state.answers=[]; state.currentQ=0; showQuestion(0); showScreen('#screen-quiz'); } });

// initialize landing
showScreen('#screen-landing');

// If listings are disabled, hide related UI elements (saved, see-all)
if(LOCATIONS.length === 0){
  const sl = document.getElementById('saved-link'); if(sl) sl.style.display = 'none';
  const see = document.getElementById('see-all-btn'); if(see) see.style.display = 'none';
}
