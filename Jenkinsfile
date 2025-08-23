pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
    post {
        always {
            emailext (
                to: 'recipient@example.com', // Replace with your email
                subject: "Jenkins Pipeline: Hello World - Build #${env.BUILD_NUMBER}",
                body: "The pipeline ${env.JOB_NAME} has completed. Status: ${currentBuild.currentResult}\n\nConsole Output: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}