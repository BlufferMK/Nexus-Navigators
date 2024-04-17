-- Drop tables if they exist 
DROP TABLE IF EXISTS energy;
DROP TABLE IF EXISTS property_type;
DROP TABLE IF EXISTS area;

-- Create 'area' table 
CREATE TABLE area (
    address VARCHAR(255) NOT NULL,        
    community_area VARCHAR(100) NOT NULL, 
    PRIMARY KEY (address)
);

-- Create 'property_type' table
CREATE TABLE property_type (
    id INT NOT NULL,
    primary_property_type VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
);

-- Create 'energy' table 
CREATE TABLE energy (
    data_year DATE NOT NULL,
    id INT NOT NULL,                        
    property_name VARCHAR(255) NOT NULL,   
    address VARCHAR(255) NOT NULL,
    chicago_energy_rating INT NOT NULL,
    exempt_from_chicago_energy_rating VARCHAR(255) NOT NULL, 
    community_area VARCHAR(255) NOT NULL,
    primary_property_type VARCHAR(255) NOT NULL,
    gross_floor_area_sq_ft INT NOT NULL,
    year_built INT NOT NULL,                
    electricity_use_kbtu INT NOT NULL,
    natural_gas_use_kbtu INT NOT NULL,
    site_eui_kbtu_sqft INT NOT NULL,
    source_eui_kbtu_sqft INT NOT NULL,
    weather_normalized_site_eui_kbtu_sqft INT NOT NULL,
    weather_normalized_source_eui_kbtu_sqft INT NOT NULL,
    total_ghg_emissions_metrictons_co2 INT NOT NULL,
    ghg_intensity_kg_co2_sqft INT NOT NULL,
    latitude INT NOT NULL,
    longitude INT NOT NULL,
    PRIMARY KEY (address, id),
    FOREIGN KEY (address) REFERENCES area(address),
    FOREIGN KEY (id) REFERENCES property_type(id)
);

-- Queries to view contents of 'area' and 'energy' tables
SELECT * FROM area;


