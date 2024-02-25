import pandas as pd

def reset_EV_population():

    df = pd.read_csv("./processed_data/general/Electric_Vehicle_Population_Data.csv")

    # Filter the dataframe to include only years larger than 2018
    df = df[df['Model_Year'] >= 2018]

    # model_counts = df.groupby(['Model_Year', 'Make']).size().unstack(fill_value=0)
    model_counts = df.groupby(['Model_Year', 'Make']).size().unstack(fill_value=0).cumsum()
    model_counts.columns = model_counts.columns.str.replace(' ', '_')
    model_counts.reset_index(inplace=True)

    # Save the resulting dataset to a CSV file
    model_counts.to_csv("./processed_data/general/Electric_Vehicle_Population_Count.csv", index=False)

def main():
    reset_EV_population()

if __name__ == '__main__':
    main()
