pipeline {
    agent any
    tools {
        nodejs "NodeJS" // Tên NodeJS được cấu hình trong Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/<yourusername>/playwright-cucumber-repo.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Playwright-Cucumber Tests') {
            steps {
                sh 'npx cucumber-js'
            }
        }
        stage('Publish Cucumber Report') {
            steps {
                cucumber fileIncludePattern: '**/*.json', sortingMethod: 'ALPHABETICAL'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
    }
}