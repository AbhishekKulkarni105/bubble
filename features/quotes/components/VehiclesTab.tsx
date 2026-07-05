import type { QuoteDetail } from "../types/quote";
import styles from "./VehiclesTab.module.css";

export function VehiclesTab({ quote }: { quote: QuoteDetail }) {
  return (
    <div className={styles.panel}>
      <div className={styles.filterStrip}>
        <div className={styles.filterCell}>
          <label>Vehicle types shown in result:</label>
          <select className={styles.sel} defaultValue="All">
            <option>All</option>
            <option>Truck Tractor</option>
            <option>Trailer</option>
          </select>
        </div>
        <div className={styles.filterCell}>
          <label>Physical damage:</label>
          <select className={styles.sel} defaultValue="All">
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className={styles.filterCell}>
          <label>Sort vehicles by:</label>
          <select className={styles.sel} defaultValue="Default (create date)">
            <option>Default (create date)</option>
            <option>Year</option>
            <option>Make</option>
          </select>
        </div>
      </div>

      <div className={styles.listHead}>List of Vehicles ({quote.vehicles.length})</div>

      {quote.vehicles.map((vehicle, i) => (
        <div key={vehicle.vin} className={styles.vehicleCard}>
          <div className={styles.cardIndex}>
            {i + 1}.<div className={styles.truckIcon}>🚚</div>
          </div>
          <div className={styles.kvGrid}>
            <b>VIN</b>
            <span>{vehicle.vin}</span>
            <b>Year</b>
            <span>{vehicle.year}</span>
            <b>Vehicle Type</b>
            <span>{vehicle.type}</span>
            <b>Make</b>
            <span>{vehicle.make}</span>
            <b>Physical damage?</b>
            <span>{vehicle.physicalDamage}</span>
            <span />
            <span />
            <b>Operating Radius</b>
            <span>{vehicle.operatingRadius}</span>
            <b>Team Driver</b>
            <span>{vehicle.teamDriver}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
