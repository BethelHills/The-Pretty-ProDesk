# GitHub Setup Instructions

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Helen-B-Udeh-Portfolio` (or your preferred name)
3. Description: "Professional Virtual Assistant Portfolio Website"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Connect Your Local Repository

After creating the repository on GitHub, copy the repository URL and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Helen-B-Udeh-Portfolio.git
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 3: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## For Future Pushes

After the initial setup, you can push changes with:

```bash
git add .
git commit -m "Your commit message"
git push
```

