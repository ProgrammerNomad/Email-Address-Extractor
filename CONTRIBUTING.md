# Contributing to Email Address Extractor 🤝

Thank you for considering contributing to Email Address Extractor! This document provides guidelines and steps for contributing.

## Table of Contents 📑
- [Code of Conduct](#code-of-conduct-)
- [Getting Started](#getting-started-)
- [Development Workflow](#development-workflow-)
- [Submitting Changes](#submitting-changes-)
- [Style Guidelines](#style-guidelines-)
- [Need Help?](#need-help-)

## Code of Conduct 📜

We are committed to providing a welcoming and inspiring community for all. Please:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started 🚀

1. **Fork the Repository**
   ```bash
   git clone https://github.com/ProgrammerNomad/Email-Address-Extractor.git
   cd Email-Address-Extractor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow 💻

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Run Tests**
   ```bash
   npm test
   npm run test:watch  # for development
   ```

3. **Lint Code**
   ```bash
   npm run lint
   npm run lint:fix    # to automatically fix issues
   ```

4. **Format Code**
   ```bash
   npm run format
   ```

## Submitting Changes 📤

1. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "type: brief description"
   ```
   
   Commit types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Formatting changes
   - `refactor`: Code restructuring
   - `test`: Adding/updating tests
   - `chore`: Maintenance tasks

2. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Describe your changes
   - Link related issues

## Style Guidelines 🎨

### JavaScript/React
- Use ES6+ features
- Follow React Hooks patterns
- Keep components focused and reusable
- Add PropTypes or TypeScript types

### CSS/SCSS
- Use Bootstrap utilities when possible
- Follow BEM naming convention
- Keep selectors specific but not too nested

### Testing
- Write tests for new features
- Maintain 80%+ coverage
- Test edge cases
- Use meaningful test descriptions

## Need Help? 💡

- Check our [Documentation](https://github.com/ProgrammerNomad/Email-Address-Extractor/wiki)
- Join our [Discussions](https://github.com/ProgrammerNomad/Email-Address-Extractor/discussions)
- [Create an Issue](https://github.com/ProgrammerNomad/Email-Address-Extractor/issues)
- Contact: [Shiv Singh](https://github.com/ProgrammerNomad)

---

By submitting a pull request, you agree to license your work under the project's [MIT License](LICENSE).