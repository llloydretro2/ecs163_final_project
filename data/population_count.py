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
    model_counts.to_csv("./unprocessed_data/Electric_Vehicle_Population_Count.csv", index=False)

def keep_top_ten():
    df = pd.read_csv("./unprocessed_data/Electric_Vehicle_Population_Count.csv")
    # Filter rows for the year 2024
    df_2024 = df[df['Model_Year'] == 2024]

    # Calculate the total counts for each category in 2024
    total_counts_2024 = df_2024.sum(axis=0)

    # Sort the categories by counts and select the top ten largest categories
    top_categories = total_counts_2024.nlargest(10)

    # Get the column names of the top ten categories
    top_categories_columns = top_categories.index


    # Add 'Model_Year' back to the DataFrame
    df_2024_filtered = df[list(top_categories_columns)]

    df_2024_filtered.to_csv("./processed_data/general/Electric_Vehicle_Population_Count.csv", index=False)

def main():
    reset_EV_population()
    keep_top_ten()

if __name__ == '__main__':
    main()
