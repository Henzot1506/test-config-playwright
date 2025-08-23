pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies
                    bat 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run Playwright tests
                    bat 'npm run bdd'
                }
            }
        }
        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
           cleanWs()
        }
    }
}