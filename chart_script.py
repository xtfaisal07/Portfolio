!pip install plotly kaleido

import plotly.graph_objects as go

# Parse the provided data
data = {
  "categories": [
    {
      "name": "Programming Languages",
      "skills": [
        {"skill": "HTML", "proficiency": 95},
        {"skill": "Python", "proficiency": 90},
        {"skill": "CSS", "proficiency": 90},
        {"skill": "JavaScript", "proficiency": 85},
        {"skill": "Java", "proficiency": 75}
      ]
    },
    {
      "name": "Frameworks & Libraries", 
      "skills": [
        {"skill": "Pandas", "proficiency": 90},
        {"skill": "Streamlit", "proficiency": 85},
        {"skill": "Bootstrap", "proficiency": 85},
        {"skill": "NumPy", "proficiency": 85},
        {"skill": "React.js", "proficiency": 80},
        {"skill": "Matplotlib", "proficiency": 80},
        {"skill": "Flask", "proficiency": 75},
        {"skill": "Django", "proficiency": 70},
        {"skill": "Node.js", "proficiency": 70}
      ]
    },
    {
      "name": "Databases & Tools",
      "skills": [
        {"skill": "VS Code", "proficiency": 95},
        {"skill": "Jupyter NB", "proficiency": 90},
        {"skill": "Git", "proficiency": 85},
        {"skill": "SQLite", "proficiency": 80},
        {"skill": "Vercel", "proficiency": 80},
        {"skill": "MongoDB", "proficiency": 75},
        {"skill": "Netlify", "proficiency": 75},
        {"skill": "Firebase", "proficiency": 70}
      ]
    }
  ]
}

# Brand colors for categories - using blues and teals as requested
colors = ['#1FB8CD', '#5D878F', '#13343B']

# Create lists for plotting
skills = []
values = []
colors_list = []

# Process each category
for i, category in enumerate(data['categories']):
    for skill in category['skills']:
        skills.append(skill['skill'])
        values.append(skill['proficiency'])
        colors_list.append(colors[i])

# Reverse order so highest values appear at top
skills.reverse()
values.reverse()
colors_list.reverse()

# Create the figure
fig = go.Figure()

# Add horizontal bar chart
fig.add_trace(go.Bar(
    x=values,
    y=skills,
    orientation='h',
    marker_color=colors_list,
    text=[f"{v}%" for v in values],
    textposition='inside',
    textfont=dict(color='white', size=10),
    hovertemplate='<b>%{y}</b><br>%{x}%<extra></extra>',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='Faisal Technical Skills',
    xaxis_title='Proficiency %',
    yaxis_title='Skills',
    showlegend=False
)

# Update axes
fig.update_xaxes(range=[0, 100])
fig.update_yaxes(tickfont=dict(size=10))

# Save the chart
fig.write_image('skills_chart.png')
print("Chart saved successfully!")