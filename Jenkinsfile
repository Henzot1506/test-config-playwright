pipeline {
    agent any // Use any available Jenkins agent instead of Docker
    tools {
        nodejs "NodeJS" // Reference the Node.js installation configured in Jenkins
    }
    
    triggers {
        githubPush() // Trigger pipeline on GitHub push events (replaces pollSCM)
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Checkout code from the configured SCM (GitHub)
            }
        }
        
        stage('Setup Node.js') {
            steps {
                sh 'node --version' // Verify Node.js version
                sh 'npm --version'  // Verify npm version
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies using npm ci for consistency
                sh 'npx playwright install --with-deps' // Install Playwright and browser dependencies
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm run test' // Run unit/integration tests
                    } catch (Exception e) {
                        echo "Tests failed: ${e.message}"
                        currentBuild.result = 'UNSTABLE' // Mark build as unstable instead of failed
                    }
                }
            }
        }
        
        stage('Run BDD') {
            steps {
                script {
                    try {
                        sh 'npm run bdd' // Run Cucumber BDD tests
                    } catch (Exception e) {
                        echo "BDD tests failed: ${e.message}"
                        currentBuild.result = 'UNSTABLE' // Mark build as unstable
                    }
                }
            }
        }
        
        stage('Publish Cucumber Report') {
            steps {
                cucumber fileIncludePattern: '**/*.json', sortingMethod: 'ALPHABETICAL' // Publish Cucumber reports
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true // Archive test reports
            cleanWs() // Clean workspace after build
        }
    }
}