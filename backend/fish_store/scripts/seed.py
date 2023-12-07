from api.models import WaterSystem,  WaterSystemConditions, Catch, Fly
from random import choice, randint
from datetime import datetime, timedelta

def run():
    fly_combinations = []
    water_access_combo = []
    water_sizes = [
        'small',
        'medium',
        'large'
    ]
    water_types = [
        'river',
        'stream',
        'lake',
        'pond'
    ]
    fish_types = ['rainbow', 'cutthroat', 'brown', 'cutbow']
    states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 
        'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 
        'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ]
    cities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
        'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Indianapolis', 'Fort Worth', 'Charlotte', 'Seattle', 'Denver', 'El Paso',
        'Detroit', 'Washington', 'Boston', 'Memphis', 'Nashville', 'Portland', 'Oklahoma City', 'Las Vegas', 'Baltimore', 'Louisville',
        'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Long Beach', 'Mesa', 'Atlanta', 'Colorado Springs',
        'Virginia Beach', 'Raleigh', 'Omaha', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Wichita', 'New Orleans', 'Arlington'
    ]
    counties = [
        'New York County', 'Los Angeles County', 'Cook County', 'Harris County', 'Maricopa County', 
        'Philadelphia County', 'Bexar County', 'San Diego County', 'Dallas County', 'Santa Clara County', 
        'Travis County', 'Duval County', 'San Francisco County', 'Franklin County', 'Marion County', 
        'Tarrant County', 'Mecklenburg County', 'King County', 'Denver County', 'El Paso County', 
        'Wayne County', 'District of Columbia', 'Suffolk County', 'Shelby County', 'Davidson County', 
        'Multnomah County', 'Oklahoma County', 'Clark County', 'Baltimore County', 'Jefferson County', 
        'Milwaukee County', 'Bernalillo County', 'Pima County', 'Fresno County', 'Sacramento County', 
        'Jackson County', 'Norfolk County', 'Hennepin County', 'Tulsa County', 'Douglas County', 
        'Miami-Dade County', 'Alameda County', 'Maricopa County', 'Salt Lake County', 'Fairfax County', 
        'Wake County', 'Omaha County', 'Hillsborough County'
    ]


    water_systems = [
        'New York City Water System', 'Los Angeles Aquatic Authority', 'Chicago FreshFlow Network', 'Houston H2O Hub',
        'Phoenix PureStream Utilities', 'Philadelphia AquaMetro Services', 'San Antonio AquaVista Corporation', 
        'San Diego Coastal Springs Authority', 'Dallas AquaRidge Solutions', 'San Jose AquaTech Management', 
        'Austin AquaFlow Systems', 'Jacksonville Riverfront Reservoirs', 'San Francisco BayWater District', 
        'Columbus Central Springs Authority', 'Indianapolis ClearFlow Utilities', 'Fort Worth Fountainhead Services', 
        'Charlotte Crystal Waters Corporation', 'Seattle SoundFlow Network', 'Denver MountainView Aquatics', 
        'El Paso Sunburst Aquifers', 'Detroit GreatLakes Utilities', 'Washington Capitol Water Works', 
        'Boston HarborHaven Services', 'Memphis RiverCity Aqueducts', 'Nashville MusicCity Waters', 
        'Portland PacificPurity Systems', 'Oklahoma City Heartland Hydrants', 'Las Vegas DesertDrops Corporation', 
        'Baltimore Chesapeake Waterways Authority'
    ]
    access_notes = [
        "Trailhead Access Nearby",
        "Boat Ramp Available",
        "Hidden Creek Access",
        "Pier for Easy Entry",
        "Private Dock Access",
        "Shoreline Open to Public",
        "Streamside Path Access",
        "Off-Road Parking",
        "Public Pier Access",
        "Quiet Inlet Access"
    ]

    water_colors = [
        'stained',
        'clear',
        'chocolate',
    ]

    water_conditions = [
        'Clear', 'Cloudy', 'Overcast', 'Sunny', 'Partly Cloudy',
        'Misty', 'Rainy', 'Foggy', 'Stormy', 'Calm'
    ]

    fly_patterns = [
        'Adams', 'Elk Hair Caddis', 'Royal Wulff', 'Pheasant Tail Nymph', 'Hare\'s Ear',
        'Woolly Bugger', 'Parachute Adams', 'Griffith\'s Gnat', 'Blue Wing Olive', 'Zebra Midge',
        'Prince Nymph', 'Humpy', 'Stimulator', 'Copper John', 'Green Drake', 'Muddler Minnow',
        'Black Ant', 'Renegade', 'Pale Morning Dun', 'Emerger'
    ]

    fly_descriptions = [
        'Versatile dry fly with a general mayfly profile.',
        'High-floating dry fly imitating caddisflies.',
        'Attractive attractor pattern with royal colors.',
        'Classic nymph pattern with pheasant tail fibers.',
        'Effective general-purpose nymph imitation.',
        'Versatile streamer fly for various species.',
        'Popular dry fly with a parachute-style hackle.',
        'Small, high-floating dry fly for tiny insects.',
        'Imitates small mayflies during various hatches.',
        'Simple yet effective midge larva imitation.',
        'Versatile attractor nymph with bead head.',
        'High-floating dry fly with a distinct profile.',
        'Stimulating dry fly for aggressive surface takes.',
        'Beadhead nymph with copper wire abdomen.',
        'Large dry fly imitating a mayfly during emergence.',
        'Versatile streamer fly with fish-attracting action.',
        'Mimics an ant floating on the water surface.',
        'Classic attractor dry fly with a distinctive look.',
        'Imitates the mayfly species during its dun stage.',
        'Effective emerger pattern during insect hatches.'
    ]

    fly_sizes = list(range(14, 23))


    for _ in range(50):
        # Create WaterSystem
        while True:
            name = choice(water_systems)            
            access = choice(access_notes)
            combo = f"{name} - {access}"
            if combo not in water_access_combo:
                water_access_combo.append(combo)
                water_system = WaterSystem.objects.create(
                    name=name,
                    size=choice(water_sizes),
                    type=choice(water_types),
                    city=choice(cities),
                    county=choice(counties),
                    state=choice(states),
                    access=access
            )
                break

        # Create WaterSystemConditions
        water_system_condition = WaterSystemConditions.objects.create(
            color=choice(water_colors),
            conditions=choice(water_conditions),
            temp=randint(50, 80),
            cfs=randint(100, 500),
            air_temp=randint(60, 90),
            water_system=water_system
        )

        # Create Fly
        while True:
            size = randint(10, 30)            
            name = f"{choice(fly_patterns)}"
            combo = f"{size} - {name}"
            if combo not in fly_combinations:
                fly_combinations.append(combo)
                fly = Fly.objects.create(
                    name=name,
                    size=size,
                    description=choice(fly_descriptions),
                    dry_fly=bool(randint(0, 1)),
                    nymph_fly=bool(randint(0, 1)),
                    streamer_fly=bool(randint(0, 1))
                )
                break
        # Create Catch
        catch = Catch.objects.create(
            fish_type=choice(fish_types),
            fish_size=randint(10, 30),
            date_caught=datetime.now() - timedelta(days=randint(1, 365)),
            time_of_day=datetime.now(),
            water_system_condition=water_system_condition,
            landed_fly=fly
        )