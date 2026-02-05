
import streamlit as st
from config import BASE_YEAR, TARGET_YEAR
from data.data_loader import load_poverty_dataset
from components.sidebar import render_sidebar
from pages.dashboard import render_dashboard

def main():
    st.set_page_config(page_title="Poverty Analysis Dashboard", layout="wide", page_icon="📊")
    
    # Initialize session state for filtering
    if 'selected_state' not in st.session_state:
        st.session_state.selected_state = 'Maharashtra'
    
    # Load primary dataset
    df = load_poverty_dataset()
    
    # Render Navigation and Filters
    filters = render_sidebar(df)
    
    # Route to Dashboard
    render_dashboard(df, filters)

if __name__ == "__main__":
    main()
