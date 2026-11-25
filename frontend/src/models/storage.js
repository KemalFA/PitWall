const KEYS = {
  TEAMS: 'pitwall_teams_cache',
  CIRCUITS: 'pitwall_circuits_cache',
  LAST_SYNC: 'pitwall_last_sync',
};

const fallbackTeams = [
  {
    id: 1,
    name: 'McLaren Formula 1 Team',
    base: 'Woking, United Kingdom',
    team_principal: 'Andrea Stella',
    power_unit: 'Mercedes',
    driver_1: 'Lando Norris',
    driver_2: 'Oscar Piastri',
    points: 666,
    championships: 9,
    accent_color: '#FF8000',
    description: 'Tim legendaris asal Woking dengan konsistensi tinggi di era ground-effect.',
  },
  {
    id: 2,
    name: 'Scuderia Ferrari',
    base: 'Maranello, Italy',
    team_principal: 'Frederic Vasseur',
    power_unit: 'Ferrari',
    driver_1: 'Charles Leclerc',
    driver_2: 'Lewis Hamilton',
    points: 652,
    championships: 16,
    accent_color: '#E8002D',
    description: 'Satu-satunya konstruktor yang tampil di seluruh musim Formula 1 sejak 1950.',
  },
  {
    id: 3,
    name: 'Oracle Red Bull Racing',
    base: 'Milton Keynes, United Kingdom',
    team_principal: 'Christian Horner',
    power_unit: 'Honda RBPT',
    driver_1: 'Max Verstappen',
    driver_2: 'Liam Lawson',
    points: 589,
    championships: 6,
    accent_color: '#3671C6',
    description: 'Konstruktor dominan dengan efisiensi aerodinamika dan eksekusi pit stop tercepat.',
  },
];

const fallbackCircuits = [
  {
    id: 1,
    name: 'Suzuka International Racing Course',
    grand_prix: 'Japanese Grand Prix',
    country: 'Japan',
    city: 'Suzuka',
    round_number: 3,
    race_date: '2025-04-06',
    length_km: '5.807',
    laps: 53,
    lap_record: '1:30.983 (Lewis Hamilton)',
    status: 'Next',
    description: 'Sirkuit figure-eight ikonik dengan rangkaian S Curves yang menguji keseimbangan downforce mobil.',
  },
  {
    id: 2,
    name: 'Bahrain International Circuit',
    grand_prix: 'Bahrain Grand Prix',
    country: 'Bahrain',
    city: 'Sakhir',
    round_number: 4,
    race_date: '2025-04-13',
    length_km: '5.412',
    laps: 57,
    lap_record: '1:31.447 (Pedro de la Rosa)',
    status: 'Scheduled',
    description: 'Balapan malam di gurun Sakhir dengan permukaan aspal abrasif dan zona pengereman berat.',
  },
];

export const Storage = {
  getTeams() {
    try {
      const raw = localStorage.getItem(KEYS.TEAMS);
      return raw ? JSON.parse(raw) : fallbackTeams;
    } catch {
      return fallbackTeams;
    }
  },

  setTeams(teams) {
    try {
      localStorage.setItem(KEYS.TEAMS, JSON.stringify(teams));
      localStorage.setItem(KEYS.LAST_SYNC, new Date().toISOString());
    } catch {
      // Abaikan jika kuota localStorage penuh
    }
  },

  getCircuits() {
    try {
      const raw = localStorage.getItem(KEYS.CIRCUITS);
      return raw ? JSON.parse(raw) : fallbackCircuits;
    } catch {
      return fallbackCircuits;
    }
  },

  setCircuits(circuits) {
    try {
      localStorage.setItem(KEYS.CIRCUITS, JSON.stringify(circuits));
      localStorage.setItem(KEYS.LAST_SYNC, new Date().toISOString());
    } catch {
      // Abaikan jika kuota localStorage penuh
    }
  },

  getLastSync() {
    return localStorage.getItem(KEYS.LAST_SYNC);
  },

  clearCache() {
    localStorage.removeItem(KEYS.TEAMS);
    localStorage.removeItem(KEYS.CIRCUITS);
    localStorage.removeItem(KEYS.LAST_SYNC);
  },
};
