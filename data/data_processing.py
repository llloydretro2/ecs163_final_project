import pandas as pd
import subprocess
import os

def process_EV_population():

    # Load datasets
    dataset1 = pd.read_csv("./unprocessed_data/Electric_Vehicle_Population_Data_1.csv")
    dataset2 = pd.read_csv("./unprocessed_data/Electric_Vehicle_Population_Data_2.csv")

    combined_dataset = pd.concat([dataset1, dataset2], ignore_index=True)

    # Drop duplicated entries based on a car's VIN
    combined_dataset.drop_duplicates(subset=["VIN (1-10)"], keep="first", inplace=True)

    combined_dataset.to_csv("./processed_data/Electric_Vehicle_Population_Data.csv")

def process_EV_charging():

    # Load datasets
    dataset1 = pd.read_excel("./unprocessed_data/EV_Charging_Stations_Feb82024.xlsx", engine="openpyxl")
    dataset2 = pd.read_excel("./unprocessed_data/EV_Charging_Stations_Jan312023.xlsx", engine="openpyxl")

    combined_dataset = pd.concat([dataset1, dataset2], ignore_index=True)

    # Drop duplicated entries based on a station's Name
    combined_dataset.drop_duplicates(subset=["Station Name"], keep="first", inplace=True)

    combined_dataset.to_csv("./processed_data/Electric_Vehicle_Charging_Data.csv")


def process_stock_data():

    # Create a separate directory for stock
    if not os.path.exists("./processed_data/stock"):
        os.mkdir("./processed_data/stock")
    commands = [
        ["cp", "./unprocessed_data/TSLA.csv", "./processed_data/stock/TSLA.csv"],
        ["cp", "./unprocessed_data/HMC.csv", "./processed_data/stock/HMC.csv"],
        ["cp", "./unprocessed_data/F.csv", "./processed_data/stock/F.csv"],
        ["cp", "./unprocessed_data/NSANY.csv", "./processed_data/stock/NSANY.csv"],
        ["cp", "./unprocessed_data/GM.csv", "./processed_data/stock/GM.csv"]
    ]

    for command in commands:
        subprocess.run(command)

def main():

    # Handle EV population dataset
    process_EV_population()

    # Copy the EV specification data directly to the processed_data directory since it is clean
    copy_commands = ["cp", "./unprocessed_data/ElectricCarData_Clean.csv", "./processed_data/ElectricCarData_Clean.csv"]
    # Rename the dataset for consistency
    rename_commands = ["mv", "./processed_data/ElectricCarData_Clean.csv", "./processed_data/Electric_Vehicle_Specification_Data.csv"]
    subprocess.run(copy_commands)
    subprocess.run(rename_commands)
    
    # Handle EV charging stations dataset
    process_EV_charging()

    # Process Stock Market Data
    process_stock_data()

    if not os.path.exists("./processed_data/general"):
        os.mkdir("./processed_data/general")
        move_commands = [
                "mv", "./processed_data/Electric_Vehicle_Specification_Data.csv", 
                "./processed_data/Electric_Vehicle_Charging_Data.csv", 
                "./processed_data/Electric_Vehicle_Population_Data.csv", 
                "./processed_data/general"
            ]
        subprocess.run(move_commands)

if __name__ == '__main__':
    main()
